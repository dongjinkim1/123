/* ============================================================
 *  lunar.js — 한국 음력→양력 변환 라이브러리 (1900-2050)
 *  korean-lunar-calendar 알고리즘 기반 (KARI 천문 데이터)
 *  ES5 strict, var/function only
 * ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
   *  한국 음력 데이터 룩업 테이블 (1900 ~ 2050, 151개)
   *  32비트 정수 인코딩:
   *    bit 30      : 양력 윤년 여부
   *    bit 25~17   : 음력 연도 총 일수
   *    bit 16      : 윤달 크기 (1=30일, 0=29일)
   *    bit 15~12   : 윤달 위치 (0=윤달 없음, 1~12)
   *    bit 11~0    : 1~12월 소월 플래그 (1=29일, 0=30일)
   * --------------------------------------------------------- */
  var KLD = [
    0x830084bd, 0x82c404ae, 0x82c60a57, 0x82fe554d, 0xc2c40d26, 0x82c60d95, // 1900-1905
    0x83014655, 0x82c4056a, 0xc2c609ad, 0x8300255d, 0x82c404ae, 0x83006a5b, // 1906-1911
    0xc2c40a4d, 0x82c40d25, 0x83005da9, 0x82c60b55, 0xc2c4056a, 0x83002ada, // 1912-1917
    0x82c6095d, 0x830074bb, 0xc2c4049b, 0x82c40a4b, 0x83005b4b, 0x82c406a9, // 1918-1923
    0xc2c40ad4, 0x83024bb5, 0x82c402b6, 0x82c6095b, 0xc3002537, 0x82c40497, // 1924-1929
    0x82fe6656, 0x82c40e4a, 0xc2c60ea5, 0x830156a9, 0x82c605b5, 0x82c402b6, // 1930-1935
    0xc30138ae, 0x82c4092e, 0x83017c8d, 0x82c40c95, 0xc2c40d4a, 0x83016d8a, // 1936-1941
    0x82c60b69, 0x82c6056d, 0xc301425b, 0x82c4025d, 0x82c4092d, 0x83002d2b, // 1942-1947
    0xc2c40a95, 0x83007d55, 0x82c40b4a, 0x82c60b55, 0xc3015555, 0x82c604db, // 1948-1953
    0x82c4025b, 0x83013857, 0xc2c4052b, 0x83008a9b, 0x82c40695, 0x82c406aa, // 1954-1959
    0xc3006aea, 0x82c60ab5, 0x82c404b6, 0x83004aae, 0xc2c60a57, 0x82c40527, // 1960-1965
    0x82fe3726, 0x82c60d95, 0xc30076b5, 0x82c4056a, 0x82c609ad, 0x830054dd, // 1966-1971
    0xc2c404ae, 0x82c40a4e, 0x83004d4d, 0x82c40d25, 0xc3008d59, 0x82c40b54, // 1972-1977
    0x82c60d6a, 0x8301695a, 0xc2c6095b, 0x82c4049b, 0x83004a9b, 0x82c40a4b, // 1978-1983
    0xc300ab27, 0x82c406a5, 0x82c406d4, 0x83026b75, 0xc2c402b6, 0x82c6095b, // 1984-1989
    0x830054b7, 0x82c40497, 0xc2c4064b, 0x82fe374a, 0x82c60ea5, 0x830086d9, // 1990-1995
    0xc2c605ad, 0x82c402b6, 0x8300596e, 0x82c4092e, 0xc2c40c96, 0x83004e95, // 1996-2001
    0x82c40d4a, 0x82c60da5, 0xc3002755, 0x82c4056c, 0x83027abb, 0x82c4025d, // 2002-2007
    0xc2c4092d, 0x83005cab, 0x82c40a95, 0x82c40b4a, 0xc3013b4a, 0x82c60b55, // 2008-2013
    0x8300955d, 0x82c404ba, 0xc2c60a5b, 0x83005557, 0x82c4052b, 0x82c40a95, // 2014-2019
    0xc3004b95, 0x82c406aa, 0x82c60ad5, 0x830026b5, 0xc2c404b6, 0x83006a6e, // 2020-2025
    0x82c60a57, 0x82c40527, 0xc2fe56a6, 0x82c60d93, 0x82c405aa, 0x83003b6a, // 2026-2031
    0xc2c6096d, 0x8300b4af, 0x82c404ae, 0x82c40a4d, 0xc3016d0d, 0x82c40d25, // 2032-2037
    0x82c40d52, 0x83005dd4, 0xc2c60b6a, 0x82c6096d, 0x8300255b, 0x82c4049b, // 2038-2043
    0xc3007a57, 0x82c40a4b, 0x82c40b25, 0x83015b25, 0xc2c406d4, 0x82c60ada, // 2044-2049
    0x830138b6  // 2050
  ];

  var BASE_YEAR = 1900;
  var SOLAR_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 29];

  /* 1000~1899년 누적 음력 일수 (사전 계산) */
  var LUNAR_BASE_DAYS = 328705;
  /* 1000~1899년 누적 양력 일수 (사전 계산) */
  var SOLAR_BASE_DAYS = 328718;
  var SOLAR_LUNAR_DAY_DIFF = 43;

  /* ---------------------------------------------------------
   *  내부 유틸 함수
   * --------------------------------------------------------- */

  function _data(y) {
    return KLD[y - BASE_YEAR];
  }

  /** 윤달 위치 (0=없음, 1~12) */
  function _leapMonth(data) {
    return (data >> 12) & 0x000F;
  }

  /** 음력 연도 총 일수 */
  function _lunarYearDays(y) {
    return (_data(y) >> 17) & 0x01FF;
  }

  /** 특정 월의 일수 (1=29일/소월, 0=30일/대월) */
  function _monthDays(y, m, isLeap) {
    var data = _data(y);
    if (isLeap && _leapMonth(data) === m) {
      return ((data >> 16) & 0x01) > 0 ? 30 : 29;
    }
    return ((data >> (12 - m)) & 0x01) > 0 ? 30 : 29;
  }

  /** 양력 윤년 여부 */
  function _isSolarLeap(y) {
    return ((_data(y) >> 30) & 0x01) > 0;
  }

  /** 양력 연도 총 일수 */
  function _solarYearDays(y) {
    return _isSolarLeap(y) ? 366 : 365;
  }

  /** 양력 특정 월 일수 */
  function _solarMonthDays(y, m) {
    if (m === 2 && _isSolarLeap(y)) return 29;
    return SOLAR_DAYS[m - 1];
  }

  /** 음력 절대 일수 (년1000 기준) */
  function _lunarAbsDays(y, m, d, isLeap) {
    var days = LUNAR_BASE_DAYS;
    var i, data, lm;

    // 1900 ~ y-1 연도 일수 합산
    for (i = BASE_YEAR; i < y; i++) {
      days += _lunarYearDays(i);
    }

    // y년 1 ~ (m-1)월 일수 합산 + 윤달 포함
    data = _data(y);
    lm = _leapMonth(data);
    for (i = 1; i < m; i++) {
      days += _monthDays(y, i, false);
    }
    // 윤달이 m 이전에 있으면 윤달 일수도 추가
    if (lm > 0 && lm < m) {
      days += _monthDays(y, lm, true);
    }

    // 윤달 요청이면 정규 월 일수 추가
    if (isLeap && lm === m) {
      days += _monthDays(y, m, false);
    }

    days += d;
    return days;
  }

  /** 양력 절대 일수 (년1000 기준) */
  function _solarAbsDays(y, m, d) {
    var days = SOLAR_BASE_DAYS;
    var i;

    for (i = BASE_YEAR; i < y; i++) {
      days += _solarYearDays(i);
    }
    for (i = 1; i < m; i++) {
      days += _solarMonthDays(y, i);
    }
    days += d;
    days -= SOLAR_LUNAR_DAY_DIFF;
    return days;
  }

  /* ---------------------------------------------------------
   *  메인 변환 함수
   * --------------------------------------------------------- */

  /**
   * 음력 날짜를 양력으로 변환
   * @param {number} lunarYear - 음력 연도 (1900~2050)
   * @param {number} lunarMonth - 음력 월 (1~12)
   * @param {number} lunarDay - 음력 일
   * @param {boolean} isLeapMonth - 윤달 여부
   * @returns {object|null} { year, month, day } 양력 날짜 또는 null
   */
  function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeapMonth) {
    /* --- 범위 검증 --- */
    if (lunarYear < BASE_YEAR || lunarYear > 2050) return null;
    if (lunarMonth < 1 || lunarMonth > 12) return null;
    if (lunarDay < 1 || lunarDay > 30) return null;

    /* --- 윤달 유효성 --- */
    var data = _data(lunarYear);
    var lm = _leapMonth(data);
    if (isLeapMonth && lm !== lunarMonth) return null;

    /* --- 일수 유효성 --- */
    var maxDay = _monthDays(lunarYear, lunarMonth, !!isLeapMonth);
    if (lunarDay > maxDay) return null;

    /* --- 음력 절대 일수 계산 --- */
    var absDays = _lunarAbsDays(lunarYear, lunarMonth, lunarDay, !!isLeapMonth);

    /* --- 양력 연도 찾기 --- */
    var solarYear = (absDays < _solarAbsDays(lunarYear + 1, 1, 1))
      ? lunarYear
      : lunarYear + 1;

    /* --- 양력 월/일 찾기 --- */
    var solarMonth = 0;
    var solarDay = 0;
    var month;
    for (month = 12; month > 0; month--) {
      var absByMonth = _solarAbsDays(solarYear, month, 1);
      if (absDays >= absByMonth) {
        solarMonth = month;
        solarDay = absDays - absByMonth + 1;
        break;
      }
    }

    return { year: solarYear, month: solarMonth, day: solarDay };
  }

  /* ---------------------------------------------------------
   *  전역 노출
   * --------------------------------------------------------- */
  window.lunarToSolar = lunarToSolar;

})();

console.log('[MBTS] lunar.js loaded');
