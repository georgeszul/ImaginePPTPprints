# Imagine PPTP Prints website

Static site for Imagine PPTP Prints (Elgin, IL), built with Astro. English at `/`, Spanish at `/es/`, with light and dark themes.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # price calculator + translation checks
npm run build        # outputs dist/
npm run check:links  # every internal link in dist/ resolves
```

## Edit content

- Phone, email, address, social links, promo code: `src/data/site.ts`
- Page text: `src/i18n/en/*.json` and `src/i18n/es/*.json`. Both languages must have the same keys; `npm test` fails if they drift.
- Photos: put the file in `src/assets/photos/<category>/`, then add an entry to `src/data/photos.ts`. The build fails if a photo isn't listed.
- Calculator prices: `src/lib/calc.js` (update `src/lib/calc.test.js` to match).

## Deploy

Netlify builds every push to `main` (see `netlify.toml`). The quote form uses Netlify Forms (form name `quote`). Turn on email notifications under Netlify → Forms → Form notifications.

## Before launch

- Native speaker review of the Spanish text.
- Confirm payment methods, size range (chart stops at 2XL; an old FAQ said 5XL), and material specs.
- Add hoodie and hat photos (`src/assets/photos/hoodies/`, `src/assets/photos/hats/`). Until then those service sections show "Photos coming soon" and the portfolio has no Hoodies or Hats filter.
- Set the real domain in `astro.config.mjs` (`site`).
- Check Netlify's current free-plan form limits; switch to Formspree if needed.

The previous PHP site is preserved at git tag `legacy-php-site`.
