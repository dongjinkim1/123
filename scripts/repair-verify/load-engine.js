// scripts/repair-verify/load-engine.js
// Loads public/engine.js (a browser script) inside a node vm sandbox so its
// pure calculation functions can be exercised from the repair-verification
// harness. Nothing here modifies engine.js — DOM/browser globals are stubbed.
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.join(__dirname, '..', '..');

function makeElementStub() {
  var el = {
    style: {}, classList: {add: noop, remove: noop, toggle: noop, contains: function(){return false;}},
    dataset: {}, children: [], childNodes: [],
    innerHTML: '', textContent: '', value: '', checked: false,
    appendChild: function(c){return c;}, removeChild: function(c){return c;},
    insertAdjacentHTML: noop, setAttribute: noop, getAttribute: function(){return null;},
    removeAttribute: noop, addEventListener: noop, removeEventListener: noop,
    querySelector: function(){return makeElementStub();},
    querySelectorAll: function(){return [];},
    getBoundingClientRect: function(){return {top:0,left:0,width:0,height:0,bottom:0,right:0};},
    focus: noop, blur: noop, click: noop, scrollIntoView: noop, remove: noop
  };
  return el;
}
function noop(){}

function buildSandbox() {
  var doc = {
    getElementById: function(){return makeElementStub();},
    querySelector: function(){return makeElementStub();},
    querySelectorAll: function(){return [];},
    createElement: function(){return makeElementStub();},
    createTextNode: function(){return makeElementStub();},
    addEventListener: noop, removeEventListener: noop,
    body: makeElementStub(), head: makeElementStub(),
    documentElement: makeElementStub(),
    readyState: 'complete', cookie: ''
  };
  var storage = {
    _d: {},
    getItem: function(k){return Object.prototype.hasOwnProperty.call(this._d,k)?this._d[k]:null;},
    setItem: function(k,v){this._d[k]=String(v);},
    removeItem: function(k){delete this._d[k];},
    clear: function(){this._d={};}
  };
  var sandbox = {
    console: console,
    document: doc,
    localStorage: storage,
    sessionStorage: storage,
    navigator: {userAgent:'node', language:'ko-KR', onLine:true, serviceWorker:{register:function(){return Promise.resolve();}}},
    location: {href:'http://localhost/', hostname:'localhost', pathname:'/', search:'', hash:'', origin:'http://localhost', reload:noop, replace:noop},
    history: {pushState:noop, replaceState:noop, back:noop},
    fetch: function(){return Promise.resolve({ok:true, json:function(){return Promise.resolve({});}, text:function(){return Promise.resolve('');}});},
    setTimeout: setTimeout, clearTimeout: clearTimeout,
    setInterval: function(){return 0;}, clearInterval: clearInterval,
    requestAnimationFrame: function(){return 0;}, cancelAnimationFrame: noop,
    alert: noop, confirm: function(){return false;}, prompt: function(){return null;},
    Promise: Promise, Math: Math, Date: Date, JSON: JSON, Object: Object,
    Array: Array, String: String, Number: Number, Boolean: Boolean,
    RegExp: RegExp, Error: Error, Map: Map, Set: Set, isNaN: isNaN,
    parseInt: parseInt, parseFloat: parseFloat, encodeURIComponent: encodeURIComponent,
    decodeURIComponent: decodeURIComponent, TextDecoder: global.TextDecoder,
    AbortController: global.AbortController, URL: global.URL,
    IntersectionObserver: function(){return {observe:noop, unobserve:noop, disconnect:noop};},
    MutationObserver: function(){return {observe:noop, disconnect:noop};},
    ResizeObserver: function(){return {observe:noop, disconnect:noop};},
    performance: {now: function(){return 0;}},
    CustomEvent: function(){return {};},
    Event: function(){return {};}
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.top = sandbox;
  return sandbox;
}

// Files engine.js expects to already be on the page (globals it reads).
var PRELUDE = ['public/saju.js', 'public/mbts_points.js', 'public/animal_data.js'];

function loadEngine(opts) {
  opts = opts || {};
  var sandbox = buildSandbox();
  var ctx = vm.createContext(sandbox);
  var loaded = [];
  var files = (opts.prelude === false ? [] : PRELUDE).concat(['public/engine.js']);

  files.forEach(function(rel) {
    var abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) return;
    var src = fs.readFileSync(abs, 'utf8');
    try {
      vm.runInContext(src, ctx, {filename: rel});
      loaded.push(rel);
    } catch (e) {
      if (rel === 'public/engine.js') throw new Error('engine.js load failed: ' + e.message);
      // Prelude files may reference page-only globals; non-fatal.
      loaded.push(rel + ' (partial: ' + e.message + ')');
    }
  });

  sandbox.__loaded = loaded;
  return sandbox;
}

module.exports = {loadEngine: loadEngine};

if (require.main === module) {
  var s = loadEngine();
  console.log('loaded:', s.__loaded);
  ['calculateSaju','calcSajuForApp','calcDaewoon','calcRelations','getSpecialSinsal',
   'calcExtraSinsal','resolveHapChungPriority','dateToJDN','getTrueSolarCorrection']
    .forEach(function(fn){
      console.log('  ' + fn + ': ' + typeof s[fn]);
    });
  console.log('sample:', JSON.stringify(s.calcSajuForApp(1993,5,26,8,40,null).P.map(function(p){return p.s+p.b;})));
}
