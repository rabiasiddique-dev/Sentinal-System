import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { DEFAULT_SHIMMER } from '@/lib/utils/image-blur';

export const metadata: Metadata = {
  title: 'Blog | Sentinel Systems',
  description: 'Latest insights on mobile security, privacy, and enterprise device management from Sentinel Systems.',
  openGraph: {
    title: 'Blog | Sentinel Systems',
    description: 'Latest insights on mobile security, privacy, and enterprise device management.',
    type: 'website',
  },
};

// Enable ISR with 1-hour revalidation
export const revalidate = 3600;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: Date;
  readTime: number;
}

/**
 * Calculate estimated read time based on word count
 * @param content - The blog post content
 * @returns Estimated read time in minutes
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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
 * Fetch published blog posts from database
 */
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();

    const blogs = await Blog.find({ published: true })
      .select('title slug content excerpt featuredImage publishedAt')
      .sort({ publishedAt: -1 })
      .lean();

    return blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
      featuredImage: blog.featuredImage,
      publishedAt: blog.publishedAt,
      readTime: calculateReadTime(blog.content),
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-cyber-black py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-semibold text-white">
            Security <span className="text-cyber-green">Insights</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Expert perspectives on mobile security, privacy protection, and enterprise device management
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full flex flex-col">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        priority={index < 3}
                        quality={85}
                        placeholder="blur"
                        blurDataURL={DEFAULT_SHIMMER}
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-cyber-green transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={post.publishedAt.toISOString()}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>{post.readTime} min read</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
