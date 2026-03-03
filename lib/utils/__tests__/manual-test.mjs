/**
 * Manual test script for Markdown parser
 * Run with: node lib/utils/__tests__/manual-test.mjs
 */

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  mangle: false,
});

// Allowed tags and attributes
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

const ALLOWED_ATTR = [
  'href',
  'src',
  'alt',
  'title',
  'class',
  'id',
];

function parseMarkdown(content) {
  const rawHtml = marked.parse(content);
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
  return sanitizedHtml;
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Test 1: Basic Markdown
console.log('=== Test 1: Basic Markdown ===');
const test1 = '# Hello World\n\nThis is **bold** and *italic* text.';
console.log('Input:', test1);
console.log('Output:', parseMarkdown(test1));
console.log('');

// Test 2: XSS Prevention
console.log('=== Test 2: XSS Prevention ===');
const test2 = '<script>alert("XSS")</script>\n\n**Safe text**';
console.log('Input:', test2);
const output2 = parseMarkdown(test2);
console.log('Output:', output2);
console.log('Contains <script>?', output2.includes('<script>') ? 'FAIL ❌' : 'PASS ✅');
console.log('Contains <strong>?', output2.includes('<strong>') ? 'PASS ✅' : 'FAIL ❌');
console.log('');

// Test 3: GFM Table
console.log('=== Test 3: GFM Table ===');
const test3 = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
console.log('Input:', test3);
const output3 = parseMarkdown(test3);
console.log('Output:', output3);
console.log('Contains <table>?', output3.includes('<table>') ? 'PASS ✅' : 'FAIL ❌');
console.log('');

// Test 4: Code Block
console.log('=== Test 4: Code Block ===');
const test4 = '```javascript\nconst x = 10;\n```';
console.log('Input:', test4);
const output4 = parseMarkdown(test4);
console.log('Output:', output4);
console.log('Contains <pre>?', output4.includes('<pre>') ? 'PASS ✅' : 'FAIL ❌');
console.log('Contains <code>?', output4.includes('<code>') ? 'PASS ✅' : 'FAIL ❌');
console.log('');

// Test 5: Read Time
console.log('=== Test 5: Read Time Calculation ===');
const test5Short = 'word '.repeat(50);
const test5Medium = 'word '.repeat(400);
const test5Long = 'word '.repeat(1000);
console.log('50 words:', calculateReadTime(test5Short), 'min (expected: 1)');
console.log('400 words:', calculateReadTime(test5Medium), 'min (expected: 2)');
console.log('1000 words:', calculateReadTime(test5Long), 'min (expected: 5)');
console.log('');

// Test 6: Complex Content
console.log('=== Test 6: Complex Content ===');
const test6 = `
# Blog Post Title

This is a paragraph with **bold** and *italic* text.

## Features

- Feature 1
- Feature 2
- Feature 3

### Code Example

\`\`\`javascript
const example = true;
\`\`\`

> This is a blockquote

[Link](https://example.com)
`;
console.log('Input length:', test6.length, 'chars');
const output6 = parseMarkdown(test6);
console.log('Output length:', output6.length, 'chars');
console.log('Contains <h1>?', output6.includes('<h1>') ? 'PASS ✅' : 'FAIL ❌');
console.log('Contains <ul>?', output6.includes('<ul>') ? 'PASS ✅' : 'FAIL ❌');
console.log('Contains <blockquote>?', output6.includes('<blockquote>') ? 'PASS ✅' : 'FAIL ❌');
console.log('Contains <a href=?', output6.includes('<a href=') ? 'PASS ✅' : 'FAIL ❌');
console.log('Read time:', calculateReadTime(test6), 'min');
console.log('');

console.log('=== All Tests Complete ===');
