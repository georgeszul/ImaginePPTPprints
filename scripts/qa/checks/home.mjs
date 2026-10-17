// The hero label's section number ("01 ·") never splits across two lines on narrow phones.
export default async function ({ open, fail }) {
  for (const path of ['/', '/es/']) {
    const { page, ctx } = await open(path, { width: 320, height: 740 });
    // Count text lines (the span is a flex item, so its own box stays single while its text wraps inside it).
    const lines = await page.evaluate(() => {
      const span = document.querySelector('.hero .kicker span[aria-hidden]');
      if (!span) return 0;
      const range = document.createRange();
      range.selectNodeContents(span);
      return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
    });
    if (lines !== 1) fail(`hero kicker number wraps on ${path} at 320px (${lines} line boxes)`);
    await ctx.close();
  }
}
