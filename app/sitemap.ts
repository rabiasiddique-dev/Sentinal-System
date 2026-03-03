import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation
 * 
 * Generates sitemap.xml with all public pages
 * Requirements: 20.10
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sentinelsys.co';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // TODO: Add dynamic blog posts when blog system is implemented
  // const blogPosts = await getBlogPosts();
  // const blogPages = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }));

  return staticPages;
}
