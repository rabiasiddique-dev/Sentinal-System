import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Configure marked with GitHub Flavored Markdown (GFM) support
 */
marked.setOptions({
  gfm: true, // Enable GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

/**
 * Allowed HTML tags for sanitization
 * Includes common formatting, structure, and code elements
 */
const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br',
  'a',
  'ul', 'ol', 'li',
  'blockquote',
  'code', 'pre',
  'strong', 'em', 'del',
  'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr',
];

/**
 * Allowed HTML attributes for sanitization
 * Restricts to safe attributes needed for links, images, and code blocks
 */
const ALLOWED_ATTR = [
  'href',
  'src',
  'alt',
  'title',
  'class',
  'id',
];

/**
 * Parse Markdown content to sanitized HTML
 * 
 * This function:
 * 1. Parses Markdown to HTML using marked with GFM support
 * 2. Sanitizes the HTML using DOMPurify to prevent XSS attacks
 * 3. Returns safe HTML ready for rendering
 * 
 * @param content - Markdown content string
 * @returns Sanitized HTML string
 * 
 * @example
 * ```typescript
 * const markdown = '# Hello\n\nThis is **bold** text.';
 * const html = parseMarkdown(markdown);
 * // Returns: '<h1 id="hello">Hello</h1>\n<p>This is <strong>bold</strong> text.</p>'
 * ```
 */
export function parseMarkdown(content: string): string {
  // Parse Markdown to HTML
  const rawHtml = marked.parse(content) as string;
  
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
  
  return sanitizedHtml;
}

/**
 * Calculate estimated read time for content
 * 
 * @param content - Text content (Markdown or plain text)
 * @returns Estimated read time in minutes
 * 
 * @example
 * ```typescript
 * const content = 'Lorem ipsum...'; // 500 words
 * const readTime = calculateReadTime(content);
 * // Returns: 3 (minutes)
 * ```
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
