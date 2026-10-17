// SEO and safety checks on the built site (dist/). Run after `npm run build`.
// One H1 per page, no skipped heading levels, unique titles and descriptions, canonicals,
// alt on every image, social tags, valid JSON-LD, no third-party scripts, robots/sitemap/llms.txt.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
})(dist);

// Pages that must stay out of search results: the thank-you pages and the 404s.
const NOINDEX = /^(thanks|es[\\/]gracias|404|es[\\/]404)[\\/]?(index)?\.html$|^404\.html$/;
const problems = [];
const titles = new Map();
const descriptions = new Map();
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const meta = (html, key) => {
  const tag = [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => m[0]).find((t) => attr(t, 'name') === key || attr(t, 'property') === key);
  return tag ? attr(tag, 'content') : undefined;
};

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const where = file.slice(dist.length).replace(/\\/g, '/');
  const fail = (msg) => problems.push(`${where}: ${msg}`);
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/.test(html);

  if (!/<html\s[^>]*lang="(en|es)"/.test(html)) fail('missing <html lang>');
  if (noindex !== NOINDEX.test(where)) fail(noindex ? 'noindex on a page that should be indexed' : 'should be noindex');

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`${h1} <h1> elements (need exactly 1)`);
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.forEach((lvl, i) => {
    if (i > 0 && lvl > levels[i - 1] + 1) fail(`heading jumps from h${levels[i - 1]} to h${lvl}`);
  });

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? '';
  if (!title) fail('missing <title>');
  else if (title.length > 65) fail(`title is ${title.length} chars (max 65): "${title}"`);
  const description = meta(html, 'description') ?? '';
  if (!description) fail('missing meta description');

  if (!noindex) {
    if (description.length < 70 || description.length > 160) fail(`meta description is ${description.length} chars (need 70-160)`);
    if (!/<link\s+rel="canonical"\s+href="https:\/\//.test(html)) fail('missing absolute canonical');
    if (titles.has(title)) fail(`title duplicates ${titles.get(title)}`);
    if (descriptions.has(description)) fail(`description duplicates ${descriptions.get(description)}`);
    titles.set(title, where);
    descriptions.set(description, where);
    for (const key of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card']) {
      if (!meta(html, key)) fail(`missing ${key}`);
    }
  }

  for (const img of html.match(/<img\s[^>]*>/g) ?? []) {
    // Astro writes an empty alt as a bare `alt` attribute (decorative images).
    if (!/\salt(=|[\s>/])/.test(img)) fail(`<img> without alt: ${img.slice(0, 80)}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail('JSON-LD does not parse'); }
  }
  for (const m of html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)) {
    if (/^(https?:)?\/\//.test(m[1])) fail(`third-party script ${m[1]}`);
  }
}

const read = (name) => (existsSync(join(dist, name)) ? readFileSync(join(dist, name), 'utf8') : '');
if (!/Sitemap: https:\/\//.test(read('robots.txt'))) problems.push('robots.txt: no Sitemap line');
if (!read('sitemap.xml').includes('<urlset')) problems.push('sitemap.xml: missing');
if (!read('llms.txt').startsWith('# ')) problems.push('llms.txt: missing or not Markdown');
const home = read('index.html');
if (!home.includes('"LocalBusiness"')) problems.push('index.html: no LocalBusiness schema');
for (const page of ['contact/index.html', 'es/contacto/index.html']) {
  if (!read(page).includes('"FAQPage"')) problems.push(`${page}: no FAQPage schema`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`OK: ${pages.length} pages pass the SEO checks.`);
