# Utility Functions

This directory contains utility functions used throughout the application.

## Markdown Parser (`markdown.ts`)

Utilities for parsing Markdown content to sanitized HTML and calculating read time.

### Features

- **GitHub Flavored Markdown (GFM)**: Full support for GFM syntax including tables, strikethrough, and task lists
- **HTML Sanitization**: Uses DOMPurify to prevent XSS attacks by removing dangerous HTML tags and attributes
- **Configurable Whitelist**: Only allows safe HTML tags and attributes
- **Read Time Calculation**: Estimates reading time based on word count (200 words per minute)

### Usage

#### Parse Markdown to HTML

```typescript
import { parseMarkdown } from '@/lib/utils/markdown';

const markdown = `
# Hello World

This is a **bold** statement with *italic* text.

- List item 1
- List item 2

\`\`\`javascript
const code = true;
\`\`\`
`;

const html = parseMarkdown(markdown);
// Returns sanitized HTML ready for rendering
```

#### Calculate Read Time

```typescript
import { calculateReadTime } from '@/lib/utils/markdown';

const content = 'Your blog post content here...';
const readTime = calculateReadTime(content);
// Returns: 5 (minutes)
```

### Security

The parser implements multiple security measures:

1. **Allowed Tags Whitelist**: Only permits safe HTML tags (headings, paragraphs, lists, links, images, code blocks, etc.)
2. **Allowed Attributes Whitelist**: Only permits safe attributes (href, src, alt, title, class, id)
3. **XSS Prevention**: Automatically removes:
   - `<script>` tags
   - `<style>` tags
   - `<iframe>` tags
   - Event handlers (onclick, onerror, etc.)
   - JavaScript URLs (javascript:)
   - Data URLs in dangerous contexts

### Configuration

The parser is configured with the following options:

```typescript
// Marked options
{
  gfm: true,        // Enable GitHub Flavored Markdown
  breaks: true,     // Convert \n to <br>
  headerIds: true,  // Add IDs to headers for anchor links
  mangle: false,    // Don't escape autolinked email addresses
}

// DOMPurify options
{
  ALLOWED_TAGS: [
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
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
  ],
}
```

### Example: Blog Post Rendering

```typescript
import { parseMarkdown, calculateReadTime } from '@/lib/utils/markdown';

interface BlogPost {
  title: string;
  content: string; // Markdown
  publishedAt: Date;
}

function BlogPostPage({ blog }: { blog: BlogPost }) {
  const htmlContent = parseMarkdown(blog.content);
  const readTime = calculateReadTime(blog.content);
  
  return (
    <article>
      <h1>{blog.title}</h1>
      <p>Published: {blog.publishedAt.toLocaleDateString()}</p>
      <p>Read time: {readTime} min</p>
      
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
```

### Supported Markdown Features

#### Basic Formatting
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- ~~Strikethrough~~: `~~text~~` (GFM)
- `Inline code`: `` `code` ``

#### Headings
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

#### Lists
```markdown
- Unordered list
- Item 2

1. Ordered list
2. Item 2
```

#### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.jpg)
```

#### Code Blocks
````markdown
```javascript
const code = true;
```
````

#### Tables (GFM)
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

#### Blockquotes
```markdown
> This is a quote
```

### Testing

The parser includes comprehensive unit tests covering:
- Basic Markdown parsing (headings, paragraphs, formatting)
- GFM features (tables, strikethrough)
- Code blocks (inline and fenced)
- Lists (ordered and unordered)
- HTML sanitization (XSS prevention)
- Edge cases (empty strings, plain text, mixed content)
- Read time calculation

Run tests with:
```bash
npm test -- lib/utils/__tests__/markdown.test.ts
```

### Requirements Validation

This utility validates **Requirement 12.1**:
> WHEN a user navigates to a blog post URL, THE Website SHALL parse Markdown content to HTML

The implementation ensures:
- ✅ Markdown is parsed to HTML using the `marked` library
- ✅ GFM (GitHub Flavored Markdown) is supported
- ✅ HTML output is sanitized using DOMPurify
- ✅ Only safe HTML tags and attributes are allowed
- ✅ XSS attacks are prevented through sanitization
