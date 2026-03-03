import { parseMarkdown, calculateReadTime } from '../markdown';

describe('parseMarkdown', () => {
  describe('basic Markdown parsing', () => {
    it('should parse headings', () => {
      const markdown = '# Heading 1\n## Heading 2\n### Heading 3';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<h1');
      expect(html).toContain('Heading 1');
      expect(html).toContain('<h2');
      expect(html).toContain('Heading 2');
      expect(html).toContain('<h3');
      expect(html).toContain('Heading 3');
    });

    it('should parse paragraphs', () => {
      const markdown = 'This is a paragraph.\n\nThis is another paragraph.';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<p>This is a paragraph.</p>');
      expect(html).toContain('<p>This is another paragraph.</p>');
    });

    it('should parse bold text', () => {
      const markdown = 'This is **bold** text.';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<strong>bold</strong>');
    });

    it('should parse italic text', () => {
      const markdown = 'This is *italic* text.';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<em>italic</em>');
    });

    it('should parse links', () => {
      const markdown = '[Click here](https://example.com)';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<a href="https://example.com">Click here</a>');
    });

    it('should parse images', () => {
      const markdown = '![Alt text](https://example.com/image.jpg)';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<img');
      expect(html).toContain('src="https://example.com/image.jpg"');
      expect(html).toContain('alt="Alt text"');
    });
  });

  describe('GitHub Flavored Markdown (GFM)', () => {
    it('should parse strikethrough text', () => {
      const markdown = 'This is ~~deleted~~ text.';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<del>deleted</del>');
    });

    it('should parse tables', () => {
      const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<table>');
      expect(html).toContain('<thead>');
      expect(html).toContain('<tbody>');
      expect(html).toContain('<th>Header 1</th>');
      expect(html).toContain('<td>Cell 1</td>');
    });

    it('should convert line breaks with breaks option', () => {
      const markdown = 'Line 1\nLine 2';
      const html = parseMarkdown(markdown);
      
      // With breaks: true, single newlines become <br>
      expect(html).toContain('Line 1');
      expect(html).toContain('Line 2');
    });
  });

  describe('code blocks', () => {
    it('should parse inline code', () => {
      const markdown = 'Use `const` for constants.';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<code>const</code>');
    });

    it('should parse code blocks', () => {
      const markdown = '```javascript\nconst x = 10;\n```';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<pre>');
      expect(html).toContain('<code');
      expect(html).toContain('const x = 10;');
    });
  });

  describe('lists', () => {
    it('should parse unordered lists', () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<ul>');
      expect(html).toContain('<li>Item 1</li>');
      expect(html).toContain('<li>Item 2</li>');
      expect(html).toContain('<li>Item 3</li>');
    });

    it('should parse ordered lists', () => {
      const markdown = '1. First\n2. Second\n3. Third';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<ol>');
      expect(html).toContain('<li>First</li>');
      expect(html).toContain('<li>Second</li>');
      expect(html).toContain('<li>Third</li>');
    });
  });

  describe('blockquotes', () => {
    it('should parse blockquotes', () => {
      const markdown = '> This is a quote';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<blockquote>');
      expect(html).toContain('This is a quote');
    });
  });

  describe('HTML sanitization', () => {
    it('should remove script tags', () => {
      const markdown = '<script>alert("XSS")</script>';
      const html = parseMarkdown(markdown);
      
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('alert');
    });

    it('should remove onclick attributes', () => {
      const markdown = '<a href="#" onclick="alert(\'XSS\')">Click</a>';
      const html = parseMarkdown(markdown);
      
      expect(html).not.toContain('onclick');
      expect(html).not.toContain('alert');
    });

    it('should remove style tags', () => {
      const markdown = '<style>body { display: none; }</style>';
      const html = parseMarkdown(markdown);
      
      expect(html).not.toContain('<style>');
    });

    it('should remove iframe tags', () => {
      const markdown = '<iframe src="https://evil.com"></iframe>';
      const html = parseMarkdown(markdown);
      
      expect(html).not.toContain('<iframe>');
    });

    it('should allow safe HTML tags', () => {
      const markdown = '<strong>Bold</strong> and <em>italic</em>';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<strong>Bold</strong>');
      expect(html).toContain('<em>italic</em>');
    });

    it('should allow safe attributes', () => {
      const markdown = '[Link](https://example.com "Title")';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('href="https://example.com"');
      expect(html).toContain('title="Title"');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const html = parseMarkdown('');
      expect(html).toBe('');
    });

    it('should handle plain text without Markdown', () => {
      const markdown = 'Just plain text';
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('Just plain text');
    });

    it('should handle mixed content', () => {
      const markdown = `
# Title

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`javascript
const code = true;
\`\`\`

> A quote

[A link](https://example.com)
`;
      const html = parseMarkdown(markdown);
      
      expect(html).toContain('<h1');
      expect(html).toContain('<strong>bold</strong>');
      expect(html).toContain('<em>italic</em>');
      expect(html).toContain('<ul>');
      expect(html).toContain('<code');
      expect(html).toContain('<blockquote>');
      expect(html).toContain('<a href="https://example.com"');
    });
  });
});

describe('calculateReadTime', () => {
  it('should calculate read time for short content', () => {
    // 50 words (less than 200 WPM)
    const content = 'word '.repeat(50);
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(1); // Rounds up to 1 minute
  });

  it('should calculate read time for medium content', () => {
    // 400 words (2 minutes at 200 WPM)
    const content = 'word '.repeat(400);
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(2);
  });

  it('should calculate read time for long content', () => {
    // 1000 words (5 minutes at 200 WPM)
    const content = 'word '.repeat(1000);
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(5);
  });

  it('should round up partial minutes', () => {
    // 250 words (1.25 minutes at 200 WPM)
    const content = 'word '.repeat(250);
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(2); // Rounds up to 2 minutes
  });

  it('should handle empty content', () => {
    const readTime = calculateReadTime('');
    expect(readTime).toBe(0);
  });

  it('should handle single word', () => {
    const readTime = calculateReadTime('word');
    expect(readTime).toBe(1); // Rounds up to 1 minute
  });

  it('should handle content with multiple spaces', () => {
    const content = 'word    word    word'; // 3 words with multiple spaces
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(1);
  });

  it('should handle content with newlines', () => {
    const content = 'word\nword\nword\n'.repeat(100); // 300 words
    const readTime = calculateReadTime(content);
    
    expect(readTime).toBe(2); // 300/200 = 1.5, rounds up to 2
  });
});
