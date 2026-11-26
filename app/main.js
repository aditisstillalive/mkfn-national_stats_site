// Boot: wires the masthead (menu, theme, active link) and hands every hash change to the router.
import { startRouter } from './router.js';

const THEME_KEY = 'angka-theme';

function readStoredTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
}

function applyTheme(theme) {
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
}

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setupThemeToggle() {
  const button = document.getElementById('theme-btn');
  applyTheme(readStoredTheme());
  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage unavailable: theme lasts for this visit */ }
    window.dispatchEvent(new Event('themechange'));
  });
}

function setupMenu() {
  const button = document.getElementById('menu-btn');
  const nav = document.getElementById('site-nav');
  const close = () => { nav.classList.remove('is-open'); button.setAttribute('aria-expanded', 'false'); button.textContent = 'Menu'; };
  button.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
  });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  return close;
}

/** Marks the nav link for the current section, so a visitor always sees where they are. */
function markActiveLink(path) {
  const section = path.split('/').slice(0, 2).join('/');
  for (const link of document.querySelectorAll('.site-nav a')) {
    const target = link.getAttribute('href').slice(1);
    const hit = target === '/' ? path === '/' : (section === target || path.startsWith(target + '/') ||
      (target === '/regions' && path.startsWith('/region/')) || (target === '/data' && path.startsWith('/indicator/')));
    if (hit) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  }
}

setupThemeToggle();
const closeMenu = setupMenu();
startRouter(document.getElementById('main'), (path) => { closeMenu(); markActiveLink(path); });
