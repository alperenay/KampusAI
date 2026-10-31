/* Per-request deadlines. A silent stream cannot keep the composer busy forever. */
(function () {
  function scope(outer, options = {}) {
    const ctrl = new AbortController();
    let phase = 'connect', expired = '', timer = null, closed = false;
    const started = Date.now();
    const abort = () => ctrl.abort();
    if (outer?.aborted) abort(); else outer?.addEventListener('abort', abort, { once: true });
    const expire = why => { if (!closed) { expired = why; ctrl.abort(); } };
    const total = setTimeout(() => expire('total'), options.totalMs ?? 120000);
    function arm(ms) { clearTimeout(timer); timer = setTimeout(() => expire(phase), ms); }
    arm(options.connectMs ?? 20000);
    return {
      signal: ctrl.signal,
      wait(promise) {
        return new Promise((resolve,reject)=>{
          const stop=()=>{cleanup();reject(this.failure(new App.ollama.OllamaError('aborted')));};
          const cleanup=()=>ctrl.signal.removeEventListener('abort',stop);
          ctrl.signal.addEventListener('abort',stop,{once:true});
          Promise.resolve(promise).then(value=>{cleanup();try{this.check();resolve(value);}catch(e){reject(e);}},error=>{cleanup();reject(this.failure(error));});
          if(ctrl.signal.aborted)stop();
        });
      },
      ready() { phase = 'first-token'; arm(Math.max(1,(options.firstMs ?? 18000)-(Date.now()-started))); },
      activity() { phase = 'stream'; arm(options.idleMs ?? 18000); },
      failure(error, partial = '') {
        if (expired) return new App.ollama.OllamaError('timeout', 'AI request timed out: ' + expired, { phase: expired, partial });
        if (outer?.aborted) return new App.ollama.OllamaError('aborted', '', { partial });
        if (partial && error && typeof error === 'object') error.partial = partial;
        return error;
      },
      check(partial = '') { if (ctrl.signal.aborted) throw this.failure(new App.ollama.OllamaError('aborted'), partial); },
      close() { closed = true; clearTimeout(timer); clearTimeout(total); outer?.removeEventListener('abort', abort); }
    };
  }
  App.aiRequest = { scope };
})();
