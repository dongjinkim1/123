// scripts/repair-verify/tz-validate.js
// Proves the F4 wall-clock -> KST table against Node's IANA tzdata (Asia/Seoul).
//
// For a wall-clock time W, the engine's normalized KST time must equal
//   W + (9h - offset(W))
// where offset(W) is the real UTC offset in force at that wall time.
'use strict';

var loader = require('./load-engine');
var S = loader.loadEngine();

// Real offset (minutes east of UTC) for Asia/Seoul at a given UTC instant.
var fmt = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Seoul', timeZoneName: 'longOffset'});
function offsetAtInstant(ms) {
  var p = fmt.formatToParts(new Date(ms)).find(function (x) { return x.type === 'timeZoneName'; }).value;
  var m = p.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!m) return 540;
  var v = (+m[2]) * 60 + (+m[3]);
  return m[1] === '-' ? -v : v;
}
// Offset in force for a WALL-clock time. For ambiguous (fall-back) wall times we
// take the first occurrence = DST, matching the engine's documented rule.
function offsetForWall(y, mo, d, h, mi) {
  var naive = Date.UTC(y, mo - 1, d, h, mi);
  var cands = [];
  [-120, -60, 0, 30, 60].forEach(function (guess) {
    var off = offsetAtInstant(naive - (540 + guess) * 60000);
    if (cands.indexOf(off) < 0) cands.push(off);
  });
  var valid = [];
  cands.forEach(function (off) {
    var inst = naive - off * 60000;
    if (offsetAtInstant(inst) === off) valid.push(off);
  });
  if (!valid.length) return null;               // non-existent wall time (spring forward)
  return Math.max.apply(null, valid);           // ambiguous -> DST (larger offset) first
}

function toMs(t) { return Date.UTC(t.y, t.m - 1, t.d, t.h, t.min); }

var checked = 0, mismatch = 0, nonexistent = 0, samples = [];

function check(y, mo, d, h, mi) {
  var real = offsetForWall(y, mo, d, h, mi);
  var got = S.normalizeWallClockToKST(y, mo, d, h, mi);
  if (real === null) {
    // Spring-forward gap: the wall time never existed. The engine resolves it
    // leniently as DST, i.e. using the offset in force AFTER the transition.
    // That post-transition offset is +10:00 in 1987/88 but +9:30 in 1955~60
    // (DST stacked on the UTC+8:30 standard), so it must be read from tzdata.
    nonexistent++;
    var naiveGap = Date.UTC(y, mo - 1, d, h, mi);
    var postOffset = offsetAtInstant(naiveGap - 540 * 60000 + 6 * 3600000);
    var expectGap = naiveGap + (540 - postOffset) * 60000;
    if (toMs(got) !== expectGap) {
      mismatch++;
      if (samples.length < 12) {
        samples.push({when: [y, mo, d, h, mi].join('-'), note: 'gap',
                      postOffset: postOffset,
                      expect: new Date(expectGap).toISOString(),
                      got: new Date(toMs(got)).toISOString()});
      }
    }
    return;
  }
  checked++;
  var expect = Date.UTC(y, mo - 1, d, h, mi) + (540 - real) * 60000;
  if (toMs(got) !== expect) {
    mismatch++;
    if (samples.length < 12) {
      samples.push({when: [y, mo, d, h, mi].join('-'), realOffset: real,
                    expect: new Date(expect).toISOString(),
                    got: new Date(toMs(got)).toISOString()});
    }
  }
}

// 1) Dense sweep across every transition-bearing year, every day, 4 times a day.
for (var y = 1940; y <= 2030; y++) {
  var dense = (y >= 1947 && y <= 1962) || (y >= 1986 && y <= 1989);
  var step = dense ? 1 : 11;
  for (var mo = 1; mo <= 12; mo++) {
    var dim = new Date(Date.UTC(y, mo, 0)).getUTCDate();
    for (var d = 1; d <= dim; d += step) {
      [0, 2, 3, 12, 23].forEach(function (h) { check(y, mo, d, h, 30); });
    }
  }
}
// 2) Minute-level sweep right around every documented boundary.
var EDGES = [
  [1954, 3, 21], [1961, 8, 9], [1961, 8, 10],
  [1948, 6, 1], [1948, 9, 12], [1948, 9, 13],
  [1955, 5, 5], [1955, 9, 8], [1955, 9, 9],
  [1960, 5, 1], [1960, 9, 17], [1960, 9, 18],
  [1987, 5, 10], [1987, 10, 11], [1988, 5, 8], [1988, 10, 9]
];
EDGES.forEach(function (e) {
  for (var h = 0; h < 24; h++) for (var mi = 0; mi < 60; mi += 15) check(e[0], e[1], e[2], h, mi);
});

console.log('\n=== F4 table vs IANA tzdata (Asia/Seoul) ===');
console.log('  wall-clock samples checked : ' + checked);
console.log('  spring-forward gap samples : ' + nonexistent + ' (engine applies DST leniently)');
console.log('  MISMATCH                   : ' + mismatch);
if (samples.length) console.log(JSON.stringify(samples, null, 2));
process.exit(mismatch > 0 ? 1 : 0);
