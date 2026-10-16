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
  for (const [w, h] of [[320, 568], [1280, 800]]) {
    const { page, ctx } = await open('/contact/', { width: w, height: h });
    const hidden = [];
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(() => {
        const el = document.activeElement;
        const header = document.querySelector('[data-header]');
        const dockEl = document.querySelector('[data-dock]');
        if (!header || !dockEl) return 'chrome missing';
        if (!el || el === document.body || el.closest('[data-header], [data-dock], .skip')) return null;
        const b = el.getBoundingClientRect();
        const dock = dockEl.getBoundingClientRect();
        const bottom = getComputedStyle(dockEl).position === 'fixed' && dock.left < b.right && dock.right > b.left ? dock.top : innerHeight;
        return b.top >= header.getBoundingClientRect().bottom - 1 && b.bottom <= bottom + 1 ? null : el.tagName + '#' + (el.id || el.textContent.trim().slice(0, 20));
      });
      if (r) hidden.push(r);
    }
    if (hidden.length) fail(`focus hidden at ${w}x${h}: ${[...new Set(hidden)].slice(0, 5).join(', ')}`);
    await ctx.close();
  }
}
