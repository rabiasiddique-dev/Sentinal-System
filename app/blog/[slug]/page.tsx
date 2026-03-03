import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { parseMarkdown, calculateReadTime } from '@/lib/utils/markdown';
import { DEFAULT_SHIMMER } from '@/lib/utils/image-blur';

// Enable ISR with 1-hour revalidation
export const revalidate = 3600;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  htmlContent: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string | null;
  publishedAt: Date;
  updatedAt: Date;
  readTime: number;
}

/**
 * Format date to readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Fetch blog post by slug from database
 * Returns null if not found or not published
 */
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug, published: true })
      .select('title slug content metaTitle metaDescription featuredImage publishedAt updatedAt')
      .lean();

    if (!blog) {
      return null;
    }

    // Parse Markdown content to HTML
    const htmlContent = parseMarkdown(blog.content);

    return {
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      htmlContent,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      featuredImage: blog.featuredImage,
      publishedAt: blog.publishedAt,
      updatedAt: blog.updatedAt,
      readTime: calculateReadTime(blog.content),
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Generate metadata for the blog post page
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Sentinel Systems',
      description: 'The requested blog post could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sentinelsystems.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.featuredImage || `${siteUrl}/images/og-default.jpg`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: postUrl,
      siteName: 'Sentinel Systems',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

/**
 * Generate Article structured data for SEO
 */
function generateArticleSchema(post: BlogPost) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sentinelsystems.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.featuredImage || `${siteUrl}/images/og-default.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Sentinel Systems',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sentinel Systems',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };
}

/**
 * Blog post page component
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  // Return 404 if post not found or not published
  if (!post) {
    notFound();
  }

  // Generate structured data
  const articleSchema = generateArticleSchema(post);

  return (
    <div className="min-h-screen bg-cyber-black py-20">
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="mb-6 text-4xl md:text-5xl font-semibold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative mb-12 rounded-lg overflow-hidden w-full h-[400px] md:h-[500px]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              quality={90}
              placeholder="blur"
              blurDataURL={DEFAULT_SHIMMER}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-semibold
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-cyber-green prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-cyber-green prose-code:bg-cyber-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-cyber-gray-900 prose-pre:border prose-pre:border-cyber-gray-700 prose-pre:rounded-lg
            prose-blockquote:border-l-4 prose-blockquote:border-cyber-green prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
            prose-ul:text-gray-300 prose-ul:mb-6
            prose-ol:text-gray-300 prose-ol:mb-6
            prose-li:mb-2
            prose-img:rounded-lg prose-img:shadow-lg
            prose-hr:border-cyber-gray-700 prose-hr:my-12
            prose-table:text-gray-300
            prose-th:bg-cyber-gray-800 prose-th:text-white
            prose-td:border-cyber-gray-700"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-cyber-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Last updated: {formatDate(post.updatedAt)}
            </div>
            <a
              href="/blog"
              className="text-cyber-green hover:underline text-sm font-medium"
            >
              ← Back to Blog
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
