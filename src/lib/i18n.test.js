import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const root = new URL('../i18n/', import.meta.url);

function load(lang) {
  const dir = new URL(`${lang}/`, root);
  return Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f.slice(0, -5), JSON.parse(readFileSync(new URL(f, dir), 'utf8'))]),
  );
}

function leaves(node, prefix = '') {
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
  }
  return [[prefix, node]];
}

const en = leaves(load('en'));
const es = leaves(load('es'));

test('en and es define exactly the same keys', () => {
  assert.deepEqual(es.map(([k]) => k).sort(), en.map(([k]) => k).sort());
});

test('no empty strings in either language', () => {
  const empty = [...en, ...es].filter(([, v]) => typeof v === 'string' && v.trim() === '').map(([k]) => k);
  assert.deepEqual(empty, []);
});

test('no banned stale facts', () => {
  const banned = /3[-–]5 business days|3[-–]7 business days|Monday[-–]Friday|12 pieces|555\) 123|info@imaginepptp/i;
  const hits = [...en, ...es].filter(([, v]) => typeof v === 'string' && banned.test(v)).map(([k]) => k);
  assert.deepEqual(hits, []);
});
