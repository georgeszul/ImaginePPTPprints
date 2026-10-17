// Netlify form contract in the built contact pages (dist/), both languages.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default async function ({ fail, repo }) {
  for (const file of ['dist/contact/index.html', 'dist/es/contacto/index.html']) {
    const html = readFileSync(join(repo, file), 'utf8');
    const form = html.match(/<form[^>]*name="quote"[^>]*>/)?.[0] ?? '';
    for (const attr of ['data-netlify="true"', 'netlify-honeypot="bot-field"', 'enctype="multipart/form-data"', 'method="POST"']) {
      if (!form.includes(attr)) fail(`${file}: quote form missing ${attr}`);
    }
    if (!/action="\/(es\/gracias|thanks)\/"/.test(form)) fail(`${file}: quote form action is not the thanks page`);
    const names = ['form-name', 'lang', 'bot-field', 'name', 'email', 'phone', 'contact_method', 'service', 'shirt_type', 'shirt_sizes', 'shirt_qty', 'shirt_colors', 'hoodie_type', 'hoodie_sizes', 'hoodie_qty', 'hoodie_colors', 'hat_type', 'hat_qty', 'hat_colors', 'banner_size', 'banner_material', 'card_size', 'card_finish', 'card_qty', 'other_qty', 'other_colors', 'deadline', 'design_file', 'reference_image', 'message', 'spanish'];
    const missing = names.filter((n) => !html.includes(`name="${n}"`));
    if (missing.length) fail(`${file}: quote form missing fields ${missing.join(', ')}`);
  }
}
