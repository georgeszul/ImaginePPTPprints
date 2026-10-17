import { defineConfig } from 'astro/config';

// ponytail: placeholder production URL; replace with the real domain at launch.
export default defineConfig({
  site: 'https://imaginepptpprints.netlify.app',
  trailingSlash: 'always',
  // Inline the (small) stylesheet into each page: no render-blocking CSS request before first paint.
  build: { inlineStylesheets: 'always' },
  experimental: {
    // Content Security Policy as a <meta> tag on every page. Astro hashes each script and style it emits,
    // so only this site's own code runs; injected scripts, styles and style attributes are blocked.
    // frame-ancestors cannot go in a meta tag, so netlify.toml sends it as a header.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
    },
  },
});
