import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { routes, type PageKey } from '../i18n/routes';
import { t } from '../i18n/t';

// llms.txt (https://llmstxt.org): a plain Markdown summary of the business and its pages for AI assistants.
const pages: { key: PageKey; doc: string }[] = [
  { key: 'home', doc: 'home' },
  { key: 'services', doc: 'services' },
  { key: 'portfolio', doc: 'portfolio' },
  { key: 'about', doc: 'about' },
  { key: 'contact', doc: 'contact' },
];
const legal: PageKey[] = ['privacy', 'terms', 'refunds'];

export const GET: APIRoute = ({ site: base }) => {
  const abs = (path: string) => new URL(path, base).href;
  const line = (key: PageKey, doc: string) => `- [${t('en', `site.nav.${key === 'home' ? 'home' : key}`)}](${abs(routes[key].en)}): ${t('en', `${doc}.meta.description`)}`;
  const body = [
    `# ${site.name}`,
    '',
    `> ${t('en', 'site.footer.about')} Most orders are ready 24–48 hours after the customer approves a digital proof. No minimum order. Service in English and Spanish.`,
    '',
    '## Pages',
    ...pages.map((p) => line(p.key, p.doc)),
    '',
    '## Páginas en español',
    ...pages.map((p) => `- [${t('es', `site.nav.${p.key}`)}](${abs(routes[p.key].es)})`),
    '',
    '## Contact',
    `- Phone, text and WhatsApp: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Address: ${site.addressLine}`,
    `- Free quotes: ${abs(routes.contact.en)}`,
    '',
    '## Policies',
    ...legal.map((key) => `- [${t('en', `${key}.title`)}](${abs(routes[key].en)})`),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
