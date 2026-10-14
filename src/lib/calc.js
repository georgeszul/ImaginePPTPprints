// Price estimate for the Services page calculator. Numbers come from the legacy
// js/price-calculator.js; print/color charges now apply to apparel only (spec §6.3).

export const PRODUCTS = ['tshirt', 'hoodie', 'hat', 'banner', 'businesscard', 'sticker'];
export const APPAREL = ['tshirt', 'hoodie', 'hat'];

const BASE = { tshirt: 8, hoodie: 22, hat: 12, banner: 3.5, businesscard: 0.25, sticker: 1.5 };
const METHOD = { screen: 2.5, dtg: 4, embroidery: 6, heat: 3, vinyl: 5 };
const COLOR = { 1: 0, 2: 1, 3: 2, 4: 3.5 };
const TURNAROUND = { standard: 1, rush: 1.3, extended: 0.9 };
const TIERS = [
  { min: 100, discount: 0.15 },
  { min: 50, discount: 0.1 },
  { min: 25, discount: 0.05 },
];
const BANNER_SQFT = 6;
const CARD_BATCH = 100;
const MAX_QTY = 10000;

const cents = (n) => Math.round(n * 100) / 100;

export function clampQty(raw) {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_QTY);
}

export function volumeDiscount(qty) {
  return TIERS.find((t) => qty >= t.min)?.discount ?? 0;
}

export function nextTier(qty) {
  return [...TIERS].reverse().find((t) => qty < t.min) ?? null;
}

export function estimate({ product, quantity, method, colors, turnaround }) {
  const qty = clampQty(quantity);
  const effectiveQty = product === 'businesscard' ? Math.max(qty, CARD_BATCH) : qty;
  const apparel = APPAREL.includes(product);
  const unitBase = (BASE[product] ?? 10) * (product === 'banner' ? BANNER_SQFT : 1);

  const base = unitBase * effectiveQty;
  const print = apparel ? (METHOD[method] ?? 0) * effectiveQty : 0;
  const color = apparel ? (COLOR[colors] ?? 0) * effectiveQty : 0;
  const discount = volumeDiscount(effectiveQty);
  const subtotal = (base + print + color) * (1 - discount);
  const total = subtotal * (TURNAROUND[turnaround] ?? 1);

  return {
    base: cents(base),
    print: cents(print),
    color: cents(color),
    volumeDiscount: discount,
    turnaroundCost: cents(total - subtotal),
    total: cents(total),
    unit: cents(total / effectiveQty),
    effectiveQty,
  };
}
