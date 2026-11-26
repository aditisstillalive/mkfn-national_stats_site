// One floating tooltip per chart, positioned in the chart's own coordinates and kept inside its edges.

export function createTooltip(container) {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.setAttribute('role', 'status');
  container.append(tip);
  return {
    show(html, x, y) {
      tip.innerHTML = html;
      tip.classList.add('is-on');
      const half = tip.offsetWidth / 2;
      const left = Math.min(Math.max(x, half + 2), container.clientWidth - half - 2);
      tip.style.left = `${left}px`;
      tip.style.top = `${Math.max(y, tip.offsetHeight + 14)}px`;
    },
    hide() { tip.classList.remove('is-on'); },
    element: tip,
  };
}
