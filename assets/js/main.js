(() => {
  'use strict';
  document.documentElement.classList.add('v2-ready');
  const v2Style = document.createElement('link'); v2Style.rel = 'stylesheet'; v2Style.href = 'assets/css/v2.css'; document.head.append(v2Style);
  document.querySelector('form')?.setAttribute('novalidate', '');
  document.querySelector('form input[type="email"]')?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } });
  const root = document.documentElement, toggle = document.querySelector('.theme'), key = 'tinker-theme';
  try { root.dataset.theme = localStorage.getItem(key) || root.dataset.theme; } catch (_) {}
  const paint = () => { if (toggle) { toggle.setAttribute('aria-label', `${root.dataset.theme === 'dark' ? 'Bedtime' : 'Playtime'} colors active. Switch theme`); toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark')); } };
  paint(); toggle?.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; paint(); try { localStorage.setItem(key, root.dataset.theme); } catch (_) {} });
  // Change this value to your real workshop opening date.
  const launchDate = new Date('2026-11-20T10:00:00');
  if (Number.isNaN(launchDate.getTime())) launchDate.setTime(Date.now());
  let timerId;
  const tick = () => { const remaining = Math.max(0, launchDate.getTime() - Date.now()); const values = [Math.floor(remaining / 864e5), Math.floor(remaining / 36e5) % 24, Math.floor(remaining / 6e4) % 60, Math.floor(remaining / 1e3) % 60]; document.querySelectorAll('[data-time]').forEach((node, index) => { node.textContent = String(values[index] ?? 0).padStart(2, '0'); }); if (remaining === 0) { clearInterval(timerId); const tag = document.querySelector('.tag'); if (tag) tag.textContent = 'WE BUILT IT!'; } };
  tick(); timerId = setInterval(tick, 1000);
  const form = document.querySelector('form'); form?.addEventListener('submit', (event) => { event.preventDefault(); const input = form.querySelector('input[type="email"]'), message = form.querySelector('[role="status"]'); if (!input || !message) return; const valid = input.checkValidity(); input.setAttribute('aria-invalid', String(!valid)); message.textContent = valid ? 'Hooray! Demo validation passed. Connect this form to an email provider for production use.' : 'Please add a valid email address.'; if (!valid) input.focus(); });
})();
