import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration
 * 
 * Controls search engine crawler access
 * Requirements: 20.11
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sentinelsys.co';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
