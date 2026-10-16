import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ratio, readThemes } from './contrast.js';

const css = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8');
const themes = readThemes(css);
const ON_COLOR = '#141414';
const TOKENS = ['paper', 'paper-2', 'ink', 'ink-soft', 'rule', 'cyan', 'magenta', 'yellow'];
const atLeast = (a, b, min, what) => {
  const r = ratio(a, b);
  assert.ok(r >= min, `${what}: ${a} on ${b} is ${r.toFixed(2)}, needs ${min}`);
};

test('ratio matches WCAG reference values', () => {
  assert.equal(Math.round(ratio('#000000', '#ffffff') * 10) / 10, 21);
  assert.equal(Math.round(ratio('#777777', '#ffffff') * 100) / 100, 4.48);
});

for (const name of ['light', 'dark']) {
  const c = themes[name];
  test(`${name}: defines every color token as hex`, () => {
    for (const k of TOKENS) assert.match(c[k] ?? '', /^#[0-9a-f]{6}$/i, `--${k}`);
  });
  test(`${name}: body and secondary text`, () => {
    atLeast(c.ink, c.paper, 7, 'ink on paper');
    atLeast(c.ink, c['paper-2'], 7, 'ink on paper-2');
    atLeast(c['ink-soft'], c.paper, 4.5, 'ink-soft on paper');
    atLeast(c['ink-soft'], c['paper-2'], 4.5, 'ink-soft on paper-2');
  });
  test(`${name}: ink-black text on cyan and yellow fills`, () => {
    atLeast(ON_COLOR, c.cyan, 4.5, 'text on cyan');
    atLeast(ON_COLOR, c.yellow, 4.5, 'text on yellow');
  });
  test(`${name}: field borders and focus rings`, () => {
    atLeast(c['ink-soft'], c['paper-2'], 3, 'field border');
    atLeast(c.ink, c.paper, 3, 'focus ring');
  });
}
