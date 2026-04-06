/* MBTSJob — 서버사이드 분석 job 모듈 */
var MBTSJob = (function() {
  var POLL_INTERVAL = 3000;
  var MAX_POLL_TIME = 600000;
  var JOB_STORAGE_KEY = 'mbts_active_job';

  function generateJobId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  async function create(type, params) {
    var jobId = generateJobId();
    // fetch 전에 localStorage 저장 (fetch 끊겨도 jobId 보존)
    localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify({
      jobId: jobId, type: type, createdAt: Date.now()
    }));
    try {
      var res = await fetch('/api/job-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: type, params: params, jobId: jobId })
      });
      var data = await res.json();
      if (data.error) throw new Error(data.error);
    } catch(e) {
      console.warn('[MBTSJob] create fetch failed, but job may be processing:', e);
    }
    return jobId;
  }

  function poll(jobId, callbacks) {
    callbacks = callbacks || {};
    var onProgress = callbacks.onProgress || function(){};
    var onDone = callbacks.onDone || function(){};
    var onFailed = callbacks.onFailed || function(){};
    var startTime = Date.now();

    var timer = setInterval(function() {
      if (Date.now() - startTime > MAX_POLL_TIME) {
        clearInterval(timer);
        localStorage.removeItem(JOB_STORAGE_KEY);
        onFailed('분석 시간이 초과되었습니다. 다시 시도해주세요.');
        return;
      }
      fetch('/api/job-status?id=' + jobId)
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.status === 'done') {
            clearInterval(timer);
            localStorage.removeItem(JOB_STORAGE_KEY);
            onDone(data.result);
          } else if (data.status === 'failed') {
            clearInterval(timer);
            localStorage.removeItem(JOB_STORAGE_KEY);
            onFailed(data.error || '분석에 실패했습니다.');
          } else {
            onProgress(data.status, 0);
          }
        })
        .catch(function(err) {
          console.warn('[MBTSJob] poll error:', err);
        });
    }, POLL_INTERVAL);

    return timer;
  }

  async function recover() {
    var stored = localStorage.getItem(JOB_STORAGE_KEY);
    if (!stored) return null;
    try {
      var job = JSON.parse(stored);
      if (Date.now() - job.createdAt > 86400000) {
        localStorage.removeItem(JOB_STORAGE_KEY);
        return null;
      }
      var res = await fetch('/api/job-status?id=' + job.jobId);
      var data = await res.json();
      if (data.status === 'done') {
        localStorage.removeItem(JOB_STORAGE_KEY);
        return { status: 'done', type: job.type, result: data.result };
      } else if (data.status === 'failed') {
        localStorage.removeItem(JOB_STORAGE_KEY);
        return { status: 'failed', type: job.type, error: data.error };
      } else {
        return { status: 'running', type: job.type, jobId: job.jobId };
      }
    } catch(e) {
      localStorage.removeItem(JOB_STORAGE_KEY);
      return null;
    }
  }

  function clear() {
    localStorage.removeItem(JOB_STORAGE_KEY);
  }

  return { create: create, poll: poll, recover: recover, clear: clear };
})();

console.log('[MBTS] mbts-job.js loaded');
