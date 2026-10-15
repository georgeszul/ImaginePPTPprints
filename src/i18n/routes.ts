export const langs = ['en', 'es'] as const;
export type Lang = (typeof langs)[number];
export const other = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

export const routes = {
  home: { en: '/', es: '/es/' },
  services: { en: '/services/', es: '/es/servicios/' },
  portfolio: { en: '/portfolio/', es: '/es/portafolio/' },
  about: { en: '/about/', es: '/es/nosotros/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  thanks: { en: '/thanks/', es: '/es/gracias/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof routes;
