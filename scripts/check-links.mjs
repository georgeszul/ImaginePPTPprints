// Fails when an internal href/src/srcset/action in dist/*.html points to a missing file or #id.
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

const targetFile = (path) => {
  const clean = decodeURI(path);
  return clean.endsWith('/') ? join(dist, clean, 'index.html') : join(dist, clean);
};

const problems = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src|action)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const url of urls) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const [beforeHash, hash] = url.split('#');
    const file = targetFile(beforeHash.split('?')[0]);
    const where = page.slice(dist.length);
    if (!existsSync(file)) {
      problems.push(`${where}: ${url} (no file)`);
    } else if (hash && file.endsWith('.html') && !readFileSync(file, 'utf8').includes(`id="${hash}"`)) {
      problems.push(`${where}: ${url} (no #${hash})`);
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`OK: ${pages.length} pages, all internal links resolve.`);
