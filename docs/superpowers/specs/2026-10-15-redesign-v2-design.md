# Redesign v2: print studio editorial

This spec covers a second, fully redesigned version of the Imagine PPTP Prints website, built on the branch `redesign-v2`. Everything a visitor sees is new: design, layouts, components, styles and wording. Only the photos, the logo, the business facts and the invisible plumbing carry over. George approved the direction, page list, wording approach and build approach on 2026-10-15.

## Goal and non-goals

The goal is a site that looks like a real print studio's portfolio, persuades a local customer to ask for a quote, and works in English and Spanish, light and dark, on phones and desktops.

Non-goals:

- Going live. `redesign-v2` is pushed to GitHub as a backup only; GitHub `main` and `rebuild-astro` stay untouched.
- New business facts. Prices, hours, address, policies and the FIRST10 code stay exactly as they are in `rebuild-astro`.
- New features beyond what `rebuild-astro` has, apart from what this spec lists.

## Branch and scope

The branch `redesign-v2` starts from `rebuild-astro` at `ff5f991`.

Kept unchanged (invisible and already tested):

- `astro.config.mjs`, `netlify.toml` (form handling, redirects, headers)
- `src/i18n/routes.ts` and `src/i18n/t.ts` (English and Spanish URLs and the text lookup helper)
- `src/lib/calc.js` and its tests (price calculator math)
- `src/data/photos.ts` (photo list, alt text, categories) and `src/assets/` (43 photos and the logo)
- `src/data/site.ts` (business facts)
- `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `scripts/check-links.mjs`, `src/lib/i18n.test.js`
- The one-line route files in `src/pages/`, which mount a view per language

Deleted and rewritten from scratch:

- Every file in `src/components/`, `src/views/`, `src/layouts/` and `src/styles/`
- Every text file in `src/i18n/en/` and `src/i18n/es/` (new keys and new wording; the parity test still enforces matching keys)
- The three current font packages, replaced by the new ones below

## Visual system

The look borrows from a print shop's own materials: proof sheets, job tickets, color bars and registration marks, set on warm paper with ink-black type.

### Color tokens

Light mode is the default. Dark mode is the "pressroom at night" version of the same system.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | `#F6F3EC` | `#121212` | Page background |
| `--paper-2` | `#ECE6DA` | `#1C1B19` | Panels, table stripes, form fields |
| `--ink` | `#141414` | `#EFEBE3` | Text, rules, primary buttons |
| `--ink-soft` | `#4A4843` | `#B5AFA4` | Secondary text (at least 4.5:1 on both papers) |
| `--rule` | `#141414` | `#3A3833` | Hairlines and grid lines |
| `--cyan` | `#22C3E6` | `#3FD0EE` | Logo cyan; strips, marks, highlights |
| `--magenta` | `#E5197E` | `#F0479A` | Strips, marks, small highlights |
| `--yellow` | `#FFD400` | `#FFD83A` | Strips, coupon, Call button |

The cyan, magenta and yellow inks appear only in thin strips, small marks, button fills and highlight bars. They are never a text color (none reaches 4.5:1 on paper) and never a large fill behind body text. Any text on an ink color is ink black and meets 4.5:1. Focus rings use `--ink`, which reaches at least 3:1 on every background.

### Type

All fonts are self-hosted through Fontsource packages pinned to an exact version:

- **Headlines**: Bricolage Grotesque (`@fontsource-variable/bricolage-grotesque@5.3.0`), using its width and optical-size axes
- **Body**: Instrument Sans (`@fontsource-variable/instrument-sans@5.3.0`)
- **Labels, numbers and prices**: IBM Plex Mono (`@fontsource/ibm-plex-mono@5.3.0`), weights 400 and 500

Body text is at least 17 px with a line height of 1.6. Headlines use tight tracking and `text-wrap: balance`.

### Layout

The layout uses a 12-column editorial grid with a 1240 px maximum width and 16 px side gutters on phones. Thin ink rules separate sections, and each section carries a mono number label (01, 02, …). Each photo carries a mono caption in the form "Fig. 3 — Endless Motorsports stickers, vinyl".

### Print-shop details

These details repeat across pages so the system feels consistent:

- **Color bar**: a cyan, magenta, yellow and ink strip, used as a divider and in the footer
- **Registration mark** (⊕): a small target mark beside section numbers and in the hero
- **Crop marks**: drawn outside the corners of featured photos
- **Job ticket**: mono label rows such as "No. 01 · Shirts · 24–48 h", used for facts, specs and the process steps
- **Coupon**: the FIRST10 offer drawn as a dashed tear-off coupon with a scissors icon

### Buttons and controls

The primary button is solid ink with paper text and a 2 px ink border; on hover a thin cyan, magenta and yellow bar grows along its bottom edge. The secondary button is an ink outline. The floating Call and WhatsApp buttons keep their text labels, which George prefers, restyled in the new system: yellow for Call, cyan for WhatsApp, both with ink text and borders. On phones they form a bottom bar with a third "Quote" button.

Every control is at least 44 by 44 px, shows a visible 3 px focus ring, and has hover states only for fine pointers.

### Motion

Motion stays calm and purposeful:

- Sections and photos rise into place as they scroll into view (CSS scroll-driven animation)
- Link underlines grow on hover
- The recent-work strip on Home scrolls on its own and has a pause button
- Buttons scale to 0.97 when pressed, using `cubic-bezier(0.23, 1, 0.32, 1)` over 160 ms

All movement stops under `prefers-reduced-motion: reduce`; opacity fades remain.

## Pages

All pages exist in English and Spanish at the current URLs (see `src/i18n/routes.ts`).

### Shared header and footer

The header holds the penguin logo and wordmark, the main menu (Home, Services, Work, About, Contact), the ES/EN switch, the light/dark toggle and a "Get a quote" button. It sticks to the top on screens taller than 480 px. On phones the menu opens as a full-screen panel.

The footer holds a large wordmark, the tagline "Professional Printing Solutions", menu links, contact details, social links, the color bar, and the privacy, cookie, terms and refund links.

### Home

Home runs in this order:

1. **Hero**: a large headline, a short supporting line, a job-ticket row of facts (24–48 h, No minimums, Free design help, Hablamos español), the quote and WhatsApp buttons, and one large featured photo with crop marks and a caption
2. **Recent work**: a self-scrolling contact-sheet strip of photos with a pause button and a link to Work
3. **Services index**: a numbered list (01 Custom shirts, 02 Hoodies, …); on desktop, hovering a row shows its photo; on phones each row shows a thumbnail
4. **How it works**: three steps laid out as a print job ticket
5. **Proof**: the real facts plus a link to the Facebook reviews; no invented reviews
6. **Closing call to action**: the FIRST10 coupon and Call, WhatsApp and email buttons

### Services

Services runs in this order:

1. A page header with an index of the six services as anchor links
2. One editorial spread per service: a large photo with caption, a spec-sheet table (methods, minimum order, turnaround) and the details. Hoodies and hats have no photos yet, so they get a typographic "Your design here" panel
3. The price calculator, styled as an order form with a running receipt total
4. The process, the materials table and the apparel and hat size charts

### Work

Work shows filter tabs (All plus the six categories, kept in the URL as `?category=`), an editorial photo grid with captions, and a full-screen viewer with swipe, arrow keys and an animated open and close.

### About

About shows the shop story in editorial columns, an opening-hours table, the address with a "Get directions" link, and contact details. It has no embedded map, because an embedded Google map sets third-party cookies and the privacy policy promises none.

### Contact

Contact shows the quote form, styled as a paper order form, beside a column with phone, WhatsApp, email, address and hours. The FAQ follows below. The form keeps its current fields, Netlify Forms handling, file upload limit and privacy note.

### Thanks and 404

Both pages are short and typographic, with a way back to Home and to Contact.

### Privacy, terms and refunds

The legal pages use one shared view: readable long-form text with a sticky contents list beside it on desktop and above it on phones. The policy content stays the same; only the wording style and layout change.

## Wording

Every visible string is rewritten in English and Spanish. The rewrite follows these rules:

- Facts stay exact: prices, hours, address, phone, email, policies, upload limits and the FIRST10 code
- The tagline stays "Professional Printing Solutions"
- No unsupported claims, no invented reviews or numbers
- Sentence case for headings, active voice, sentences under 20 words, no "easy", "simple", "just" or "very"
- Spanish copy is written for Spanish speakers in Elgin, not translated word for word

## Technical rules

The rebuild follows these rules:

- Astro 5 static output, one view per page that takes `lang`, mounted by the existing route files
- All text goes through `t()` and `tRaw()`; no hard-coded visible strings in components
- No third-party scripts, no cookies, no external requests at runtime; fonts and images are self-hosted
- Images use Astro's image pipeline (AVIF and WebP with responsive sizes); only the hero photo loads eagerly
- Theme is set by the existing inline script on `data-theme` before paint; the site renders correctly without JavaScript
- Every new interactive piece works by keyboard and announces its state to screen readers

## Skills by phase

Each phase uses these skills:

| Phase | Work | Skills |
| --- | --- | --- |
| 1 | Tokens, fonts, base styles | taste-skill, frontend-design, apple-design, ui-ux-pro-max |
| 2 | Header, footer, floating buttons, menu, theme and language controls | emil-design-eng, web-design-engineer |
| 3 | Pages and wording | frontend-design, taste-skill, writing-guidelines |
| 4 | Design review | impeccable (critique, audit, polish), taste-skill redesign audit, ui-ux-pro-max checklist, emil-design-eng review |
| 5 | Final checks | web-design-guidelines, extract-design-system, playwright-cli |

Skipped skills and the reason for each:

- brandkit, image-to-code and the imagegen skills need an image generator, which this environment lacks
- stitch-skill needs Google Stitch
- The brutalist, soft and minimalist taste variants describe other styles
- The React skills do not apply to an Astro site
- graphify does not apply to website work

## Testing and acceptance

The redesign is done when all of these pass:

- `npm test`: unit tests, including English and Spanish key parity
- `npm run check`: 0 errors and 0 warnings
- `npm run build`: all 20 pages build
- `npm run check:links`: every internal link resolves
- A Playwright screenshot matrix at 1280, 375 and 320 px wide, light and dark, with no horizontal scroll, no overlapping text and no console errors
- Accessibility checks: text contrast at least 4.5:1, focus rings at least 3:1, touch targets at least 44 px, focus never hidden behind the header or the floating buttons
- Lighthouse on Home, light and dark: performance at least 90, accessibility 100

## Open items

These items stay open after the redesign:

- Real Facebook review quotes from George for the proof section
- Photos for hoodies and hats
- The launch decision: whether `redesign-v2` or `rebuild-astro` replaces GitHub `main`
