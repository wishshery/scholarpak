export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://scholarpak.com/sitemap.xml',
    host: 'https://scholarpak.com',
  };
}
