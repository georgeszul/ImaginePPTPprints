import type { Lang } from './routes';

type Tree = { [key: string]: unknown };

const modules = import.meta.glob<Tree>('./*/*.json', { eager: true, import: 'default' });
const dict: Record<Lang, Tree> = { en: {}, es: {} };
for (const [path, data] of Object.entries(modules)) {
  const m = path.match(/^\.\/(en|es)\/([\w-]+)\.json$/);
  if (m) dict[m[1] as Lang][m[2]] = data;
}

/** Any value (string, array, object) at a dotted key like "home.hero.title". Throws at build time if missing. */
export function tRaw<T = unknown>(lang: Lang, key: string): T {
  let node: unknown = dict[lang];
  for (const part of key.split('.')) {
    node = node !== null && typeof node === 'object' ? (node as Tree)[part] : undefined;
  }
  if (node === undefined) throw new Error(`Missing i18n key "${key}" for "${lang}"`);
  return node as T;
}

/** String at a dotted key. Throws if missing or not a string. */
export function t(lang: Lang, key: string): string {
  const value = tRaw(lang, key);
  if (typeof value !== 'string') throw new Error(`i18n key "${key}" for "${lang}" is not a string`);
  return value;
}
