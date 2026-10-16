// WCAG 2 contrast for the design tokens (spec: Color tokens). Used by contrast.test.js.
const channel = (v) => {
  v /= 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Hex tokens per theme: the block holding :root[data-theme='light'] and the one holding :root[data-theme='dark']. */
export function readThemes(css) {
  const block = (selector) => {
    const at = css.indexOf(selector);
    if (at === -1) return {};
    const body = css.slice(css.indexOf('{', at) + 1, css.indexOf('}', at));
    return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
  };
  return { light: block(":root[data-theme='light']"), dark: block(":root[data-theme='dark']") };
}
