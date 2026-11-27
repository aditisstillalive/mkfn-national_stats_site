// Hash router. Each page lives in its own module under views/, fetched with a literal import() the first time it is
// visited, so the first load is only the shell. A view exports render(params) returning { title, html, mount }.
//
//   #/                      overview          #/regions            province map and table
//   #/topic/<topic>         a topic page      #/region/<iso>       one province
//   #/indicator/<id>        one indicator     #/compare[/<id>]     Indonesia beside its neighbours
//   #/data                  data catalogue    #/about              sources and methods

const ROUTES = [
  { pattern: /^\/$/, load: () => import('./views/home.js') },
  { pattern: /^\/topic\/([a-z]+)$/, load: () => import('./views/topic.js') },
  { pattern: /^\/indicator\/([a-z0-9-]+)$/, load: () => import('./views/indicator.js') },
  { pattern: /^\/regions$/, load: () => import('./views/regions.js') },
  { pattern: /^\/region\/([a-z]{2})$/, load: () => import('./views/province.js') },
  { pattern: /^\/compare(?:\/([a-z0-9-]+))?$/, load: () => import('./views/compare.js') },
  { pattern: /^\/data$/, load: () => import('./views/catalogue.js') },
  { pattern: /^\/about$/, load: () => import('./views/about.js') },
];

const SITE = 'Angka Nusantara';

function currentPath() {
  const hash = location.hash.replace(/^#/, '');
  let raw;
  try {
    raw = decodeURIComponent(hash) || '/';
  } catch {
    raw = hash; // e.g. #/% : left undecoded, it matches no route and shows the not-found page
  }
  return raw.split('?')[0].replace(/\/+$/, '') || '/';
}

function queryOf() {
  const at = location.hash.indexOf('?');
  return new URLSearchParams(at === -1 ? '' : location.hash.slice(at + 1));
}

async function resolve(path) {
  for (const route of ROUTES) {
    const match = path.match(route.pattern);
    if (match) return { module: await route.load(), params: match.slice(1) };
  }
  return { module: await import('./views/not-found.js'), params: [path] };
}

export function startRouter(outlet, onNavigate) {
  let lastPath = null;
  let token = 0;

  async function show() {
    const path = currentPath();
    const samePage = path === lastPath;
    const mine = ++token;
    onNavigate(path);
    let page;
    try {
      const { module, params } = await resolve(path);
      page = module.render(params, queryOf());
      if (!page) page = (await import('./views/not-found.js')).render([path]);
    } catch (error) {
      console.error(error);
      page = { title: 'Something went wrong', html: `<h1>This page could not be shown</h1><p>Please <a href="#/">return to the overview</a>.</p>` };
    }
    if (mine !== token) return;
    document.title = page.title ? `${page.title} · ${SITE}` : `${SITE} · Indonesia in figures`;
    outlet.innerHTML = page.html;
    page.mount?.(outlet);
    if (!samePage) {
      window.scrollTo(0, 0);
      if (lastPath !== null) outlet.focus({ preventScroll: true });
    }
    lastPath = path;
  }

  window.addEventListener('hashchange', show);
  show();
}
