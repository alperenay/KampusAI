/* =========================================================
   loading-animation.js — Bekleme Animasyonu
   AI cevapları yazılırken gözüken holografik animasyon
   ========================================================= */
(function () {
  const t = App.t;

  /**
   * Bekleme animasyonu canvas HTML'i oluştur
   * @returns {string} Canvas ve kontrol HTML'i
   */
  function createLoadingHtml(model = 'gemini-3.5-flash-lite') {
    return `
      <div class="loading-animation" data-loading>
        <canvas id="loadingCanvas" width="800" height="280"></canvas>
        <div class="loading-animation__text">
          <div class="loading-animation__title">Yanıt yazılıyor</div>
          <div class="loading-animation__model">${model}</div>
          <div class="loading-animation__time"><span id="loadingTime">0</span> sn</div>
        </div>
      </div>
    `;
  }

  /**
   * Canvas animasyonunu başlat
   */
  function startAnimation(canvas, startTime) {
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let startMS = startTime || Date.now();

    const particles = [];

    class Particle {
      constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = 1;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.life -= 0.02;
      }

      draw(ctx) {
        if (this.life <= 0) return;
        ctx.globalAlpha = this.life * 0.8;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawFrame() {
      const now = Date.now();
      const elapsed = (now - startMS) / 4000;

      // Arka plan
      ctx.fillStyle = 'rgba(20, 40, 80, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hologram ışığı
      const glowGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 300);
      glowGrad.addColorStop(0, 'rgba(100, 200, 255, 0.08)');
      glowGrad.addColorStop(1, 'rgba(100, 200, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Kenar glow
      const glowWidth = 2 + Math.sin(elapsed * Math.PI * 2) * 1;
      ctx.strokeStyle = `rgba(100, 200, 255, ${0.6 + Math.sin(elapsed * Math.PI * 2) * 0.3})`;
      ctx.lineWidth = glowWidth;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Core oluştur
      const coreX = canvas.width * 0.25;
      const coreY = canvas.height / 2;

      // Dönen orbital katmanlar
      for (let layer = 3; layer > 0; layer--) {
        const angle = elapsed * Math.PI * 2 * (layer % 2 === 0 ? 1 : -1);
        const scale = 1 + Math.sin(elapsed * Math.PI * 2 + layer) * 0.2;
        const radius = 30 * (0.5 + layer * 0.25) * scale;

        ctx.strokeStyle = `rgba(100, 200, 255, ${0.6 - layer * 0.15})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(coreX, coreY, radius, angle, angle + Math.PI * 2);
        ctx.stroke();
      }

      // Pulsing core
      const corePulse = Math.sin(elapsed * Math.PI * 2) * 0.4 + 0.8;
      ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
      ctx.shadowBlur = 20 * corePulse;
      ctx.fillStyle = `rgba(100, 255, 200, ${0.8 * corePulse})`;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 16 * corePulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(coreX, coreY, 2, 0, Math.PI * 2);
      ctx.fill();

      // Parçacıklar
      if (Math.random() < 0.4) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        const colors = ['rgba(100, 200, 255, 0.9)', 'rgba(100, 255, 200, 0.9)', 'rgba(200, 100, 255, 0.9)'];
        particles.push(new Particle(
          coreX + Math.cos(angle) * 30,
          coreY + Math.sin(angle) * 30,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 0.5,
          colors[Math.floor(Math.random() * colors.length)]
        ));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(drawFrame);
    }

    drawFrame();

    // Zaman sayacı
    const timeEl = document.getElementById('loadingTime');
    const timeInterval = setInterval(() => {
      if (!timeEl) {
        clearInterval(timeInterval);
        return;
      }
      const elapsed = Math.floor((Date.now() - startMS) / 1000);
      timeEl.textContent = elapsed;
    }, 1000);

    return { cancel: () => { cancelAnimationFrame(animationId); clearInterval(timeInterval); } };
  }

  // Export
  window.App = window.App || {};
  App.loadingAnimation = {
    createHtml: createLoadingHtml,
    start: startAnimation
  };
})();
