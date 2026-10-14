import type { APIRoute } from 'astro';
import { routes, langs, type PageKey } from '../i18n/routes';

const pages = (Object.keys(routes) as PageKey[]).filter((k) => k !== 'thanks');

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const urls = pages.flatMap((page) =>
    langs.map((lang) =>
      [
        '  <url>',
        `    <loc>${abs(routes[page][lang])}</loc>`,
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(routes[page][l])}"/>`),
        '  </url>',
      ].join('\n'),
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
