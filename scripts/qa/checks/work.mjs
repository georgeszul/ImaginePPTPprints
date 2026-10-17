// No-JS shows every photo and hides filters; ?category= filters on load; Escape returns focus to the photo.
export default async function ({ open, fail }) {
  {
    const { page, ctx } = await open('/portfolio/', { js: false });
    const r = await page.evaluate(() => ({ shown: [...document.querySelectorAll('[data-gallery] li')].filter((li) => li.getBoundingClientRect().height > 0).length, total: document.querySelectorAll('[data-gallery] li').length, filters: getComputedStyle(document.querySelector('[data-filters]')).display }));
    if (r.shown !== r.total || r.total < 40) fail(`no-JS work: ${r.shown}/${r.total} photos visible`);
    if (r.filters !== 'none') fail('no-JS work: filter buttons shown but cannot work');
    await ctx.close();
  }
  {
    const { page, ctx } = await open('/portfolio/?category=stickers');
    const r = await page.evaluate(() => ({ pressed: document.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter, other: [...document.querySelectorAll('[data-gallery] li:not([hidden])')].some((li) => li.dataset.category !== 'stickers') }));
    if (r.pressed !== 'stickers' || r.other) fail(`work filter from URL: ${JSON.stringify(r)}`);
    await page.click('[data-gallery] li:not([hidden]) .thumb');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    if (!(await page.evaluate(() => document.activeElement?.classList.contains('thumb')))) fail('work viewer: focus does not return to the photo after Escape');
    await ctx.close();
  }
}
