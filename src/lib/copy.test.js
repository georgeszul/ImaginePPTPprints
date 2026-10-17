import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = (lang) => JSON.parse(readFileSync(new URL(`../i18n/${lang}/services.json`, import.meta.url), 'utf8'));

// "7 1/4" must not break between the 7 and the 1/4, or "7 – 7 1/4" reads as "7 – 7" on a phone.
for (const lang of ['en', 'es']) {
  test(`${lang}: hat sizes keep whole numbers and fractions together`, () => {
    const cells = load(lang).sizes.hats.rows.flat();
    const split = cells.filter((c) => /\d \d+\/\d/.test(c));
    assert.deepEqual(split, [], 'use a non-breaking space (U+00A0) between a whole number and its fraction');
  });
}
