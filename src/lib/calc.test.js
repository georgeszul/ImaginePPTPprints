import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimate, clampQty, volumeDiscount, nextTier, APPAREL } from './calc.js';

const tee = { product: 'tshirt', method: 'screen', colors: '1', turnaround: 'standard' };

test('10 tees, screen, 1 color, standard', () => {
  const r = estimate({ ...tee, quantity: 10 });
  assert.equal(r.base, 80);
  assert.equal(r.print, 25);
  assert.equal(r.color, 0);
  assert.equal(r.total, 105);
  assert.equal(r.unit, 10.5);
});

test('rush adds 30%', () => {
  const r = estimate({ ...tee, quantity: 10, turnaround: 'rush' });
  assert.equal(r.total, 136.5);
  assert.equal(r.unit, 13.65);
  assert.equal(r.turnaroundCost, 31.5);
});

test('50 hoodies, DTG, 2 colors gets 10% volume discount', () => {
  const r = estimate({ product: 'hoodie', quantity: 50, method: 'dtg', colors: '2', turnaround: 'standard' });
  assert.equal(r.volumeDiscount, 0.1);
  assert.equal(r.total, 1215);
  assert.equal(r.unit, 24.3);
});

test('25 tees, extended turnaround: 5% volume then -10%', () => {
  const r = estimate({ ...tee, quantity: 25, turnaround: 'extended' });
  assert.equal(r.total, 224.44);
  assert.equal(r.unit, 8.98);
  assert.equal(r.turnaroundCost, -24.94);
});

test('business cards ignore print method and colors (bug fix)', () => {
  const r = estimate({ product: 'businesscard', quantity: 100, method: 'embroidery', colors: '4', turnaround: 'standard' });
  assert.equal(r.print, 0);
  assert.equal(r.color, 0);
  assert.equal(r.total, 21.25);
  assert.equal(r.unit, 0.21);
});

test('business cards print in batches of 100 (effective quantity)', () => {
  const r = estimate({ product: 'businesscard', quantity: 10, method: 'screen', colors: '1', turnaround: 'standard' });
  assert.equal(r.effectiveQty, 100);
  assert.equal(r.total, 21.25);
  assert.equal(r.unit, 0.21);
});

test('banner assumes 6 sq ft and ignores print/colors', () => {
  const r = estimate({ product: 'banner', quantity: 1, method: 'vinyl', colors: '3', turnaround: 'standard' });
  assert.equal(r.total, 21);
});

test('stickers ignore print/colors', () => {
  const r = estimate({ product: 'sticker', quantity: 10, method: 'dtg', colors: '2', turnaround: 'standard' });
  assert.equal(r.total, 15);
  assert.equal(r.unit, 1.5);
});

test('clampQty handles junk input', () => {
  assert.equal(clampQty(''), 1);
  assert.equal(clampQty(null), 1);
  assert.equal(clampQty('abc'), 1);
  assert.equal(clampQty('0'), 1);
  assert.equal(clampQty('-3'), 1);
  assert.equal(clampQty('12.7'), 12);
  assert.equal(clampQty('1e5'), 10000);
  assert.equal(clampQty(20000), 10000);
});

test('estimate never returns NaN for junk quantity', () => {
  const r = estimate({ ...tee, quantity: 'abc' });
  assert.equal(r.effectiveQty, 1);
  assert.ok(Number.isFinite(r.total) && Number.isFinite(r.unit));
});

test('volume tiers at the boundaries', () => {
  assert.equal(volumeDiscount(24), 0);
  assert.equal(volumeDiscount(25), 0.05);
  assert.equal(volumeDiscount(49), 0.05);
  assert.equal(volumeDiscount(50), 0.1);
  assert.equal(volumeDiscount(99), 0.1);
  assert.equal(volumeDiscount(100), 0.15);
});

test('nextTier points at the next discount', () => {
  assert.deepEqual(nextTier(10), { min: 25, discount: 0.05 });
  assert.deepEqual(nextTier(30), { min: 50, discount: 0.1 });
  assert.equal(nextTier(100), null);
});

test('only apparel gets print/color charges', () => {
  assert.deepEqual(APPAREL, ['tshirt', 'hoodie', 'hat']);
});
