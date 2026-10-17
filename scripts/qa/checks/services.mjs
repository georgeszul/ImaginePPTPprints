// No-JS: the calculator still shows its server-rendered default total. JS: banner hides apparel-only fields.
export default async function ({ open, fail }) {
  {
    const { page, ctx } = await open('/services/', { js: false });
    const total = await page.textContent('[data-out="total"]');
    if (!/\$\d/.test(total ?? '')) fail(`no-JS: calculator shows no default total (${total})`);
    await ctx.close();
  }
  {
    const { page, ctx } = await open('/services/');
    await page.selectOption('#c-product', 'banner');
    const hidden = await page.evaluate(() => document.querySelector('[data-group="method"]').hidden && document.querySelector('[data-group="colors"]').hidden);
    if (!hidden) fail('calculator: banner still shows method and colors');
    await page.selectOption('#c-product', 'tshirt');
    await page.fill('#c-qty', '24');
    const vol = await page.textContent('[data-out="volume"]');
    if (!/\b1\b/.test(vol ?? '') || !/5\s?%/.test(vol ?? '')) fail(`calculator: volume hint for 24 is "${vol}"`);
    await ctx.close();
  }
}
