// Phone menu reachable in landscape, closes on Escape, works without JavaScript; focus never hidden.
export default async function ({ open, fail }) {
  {
    const { page, ctx } = await open('/thanks/', { width: 667, height: 320 });
    if (!(await page.$('[data-menu-btn]'))) {
      fail('menu: no [data-menu-btn] on /thanks/');
    } else {
      await page.click('[data-menu-btn]');
      const visible = await page.evaluate(async () => {
        const last = [...document.querySelectorAll('#site-nav a')].at(-1);
        if (!last) return false;
        last.scrollIntoView({ block: 'nearest' });
        await new Promise((res) => setTimeout(res, 150));
        const b = last.getBoundingClientRect();
        return b.bottom <= innerHeight && b.top >= 0;
      });
      if (!visible) fail('menu: last link not reachable at 667x320');
      await page.keyboard.press('Escape');
      if ((await page.getAttribute('[data-menu-btn]', 'aria-expanded')) !== 'false') fail('menu: Escape does not close it');
      if (!(await page.evaluate(() => document.activeElement?.matches('[data-menu-btn]')))) fail('menu: focus does not return to the menu button');
    }
    await ctx.close();
  }
  {
    const { page, ctx } = await open('/thanks/', { width: 375, js: false });
    const n = await page.evaluate(() => [...document.querySelectorAll('#site-nav a')].filter((a) => a.getBoundingClientRect().height > 0).length);
    if (n < 5) fail(`no-JS: only ${n} menu links visible on a phone`);
    await ctx.close();
  }
  // The header bar stays one row (its height drives scroll padding and sticky offsets).
  for (const [path, w] of [['/es/', 320], ['/es/', 1024], ['/es/', 1101], ['/', 320]]) {
    const { page, ctx } = await open(path, { width: w, height: 800 });
    const r = await page.evaluate(() => ({ h: document.querySelector('[data-header]').getBoundingClientRect().height, token: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) }));
    if (r.h > r.token + 1) fail(`header wraps at ${w}px on ${path}: ${Math.round(r.h)}px tall, --header-h is ${r.token}px`);
    await ctx.close();
  }
  // Contact and Thanks carry their own call/WhatsApp buttons, so the floating ones are not rendered there.
  for (const [path, want] of [['/contact/', false], ['/es/gracias/', false], ['/services/', true]]) {
    const { page, ctx } = await open(path);
    if (Boolean(await page.$('[data-dock]')) !== want) fail(`contact buttons ${want ? 'missing' : 'should not render'} on ${path}`);
    await ctx.close();
  }
  for (const [path, w, h] of [['/contact/', 320, 568], ['/contact/', 1280, 800], ['/services/', 320, 568], ['/services/', 1280, 800]]) {
    const { page, ctx } = await open(path, { width: w, height: h });
    const hidden = [];
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(() => {
        const el = document.activeElement;
        const header = document.querySelector('[data-header]');
        const dockEl = document.querySelector('[data-dock]');
        if (!header) return 'chrome missing';
        if (!el || el === document.body || el.closest('[data-header], [data-dock], .skip')) return null;
        const b = el.getBoundingClientRect();
        // The contact buttons are absent on Contact/Thanks and step aside while the page shows its own.
        const dockCs = dockEl && getComputedStyle(dockEl);
        const dock = dockEl?.getBoundingClientRect();
        const covers = dockEl && dockCs.position === 'fixed' && dockCs.visibility !== 'hidden' && dock.left < b.right && dock.right > b.left;
        const bottom = covers ? dock.top : innerHeight;
        return b.top >= header.getBoundingClientRect().bottom - 1 && b.bottom <= bottom + 1 ? null : el.tagName + '#' + (el.id || el.textContent.trim().slice(0, 20));
      });
      if (r) hidden.push(r);
    }
    if (hidden.length) fail(`focus hidden on ${path} at ${w}x${h}: ${[...new Set(hidden)].slice(0, 5).join(', ')}`);
    await ctx.close();
  }
}
