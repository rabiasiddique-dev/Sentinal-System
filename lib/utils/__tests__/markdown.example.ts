/**
 * Example usage of the Markdown parser utility
 * This file demonstrates how to use parseMarkdown and calculateReadTime
 */

import { parseMarkdown, calculateReadTime } from '../markdown';

// Example 1: Basic Markdown parsing
const basicMarkdown = `
# Welcome to Sentinel Systems

Sentinel Systems provides **enterprise-grade mobile security** for organizations that demand the highest level of protection.

## Key Features

- Secure Boot technology
- Titan M chip integration
- Full device encryption
- De-Googled architecture

Visit our [website](https://sentinelsystems.com) for more information.
`;

console.log('Example 1: Basic Markdown');
console.log('Input:', basicMarkdown);
console.log('Output:', parseMarkdown(basicMarkdown));
console.log('Read time:', calculateReadTime(basicMarkdown), 'minutes');
console.log('\n---\n');

// Example 2: Code blocks
const codeMarkdown = `
# Installation Guide

Install the Sentinel SDK:

\`\`\`bash
npm install @sentinel/sdk
\`\`\`

Then initialize it in your code:

\`\`\`javascript
import { SentinelSDK } from '@sentinel/sdk';

const sdk = new SentinelSDK({
  apiKey: process.env.SENTINEL_API_KEY,
});
\`\`\`
`;

console.log('Example 2: Code Blocks');
console.log('Input:', codeMarkdown);
console.log('Output:', parseMarkdown(codeMarkdown));
console.log('\n---\n');

// Example 3: Tables (GFM)
const tableMarkdown = `
# Feature Comparison

| Feature | Normal Android | Sentinel |
|---------|----------------|----------|
| Secure Boot | ❌ | ✅ |
| Encryption | Partial | Full |
| Privacy | Limited | Complete |
`;

console.log('Example 3: Tables (GFM)');
console.log('Input:', tableMarkdown);
console.log('Output:', parseMarkdown(tableMarkdown));
console.log('\n---\n');

// Example 4: XSS Prevention
const maliciousMarkdown = `
# Security Test

This content contains malicious code:

<script>alert('XSS')</script>

<img src="x" onerror="alert('XSS')">

<a href="javascript:alert('XSS')">Click me</a>

But this safe content should remain:

**Bold text** and *italic text* are fine.
`;

console.log('Example 4: XSS Prevention');
console.log('Input:', maliciousMarkdown);
console.log('Output (sanitized):', parseMarkdown(maliciousMarkdown));
console.log('\n---\n');

// Example 5: Blog post simulation
const blogPost = {
  title: 'Understanding Mobile Security in 2024',
  content: `
# Understanding Mobile Security in 2024

Mobile security has become increasingly critical as organizations rely more heavily on mobile devices for business operations. In this comprehensive guide, we'll explore the key aspects of mobile security and why traditional approaches are no longer sufficient.

## The Threat Landscape

Modern mobile threats include:

1. **Malware and Spyware**: Sophisticated attacks targeting sensitive data
2. **Network Vulnerabilities**: Man-in-the-middle attacks on public WiFi
3. **Physical Access**: Device theft and unauthorized access
4. **Supply Chain Attacks**: Compromised hardware and software

## Why Traditional Android Falls Short

Standard Android devices have several security limitations:

- Unlocked bootloaders allow system modifications
- Google services collect extensive telemetry
- Pre-installed bloatware creates attack surfaces
- Limited control over system updates

## The Sentinel Approach

Sentinel Systems addresses these challenges through:

### Hardware Security

Our devices leverage the **Titan M security chip** for:
- Secure key storage
- Boot verification
- Transaction authentication

### Software Hardening

We implement multiple layers of protection:

\`\`\`
Secure Boot → Verified Boot → System Hardening → App Sandboxing
\`\`\`

### Privacy by Design

Every component is designed with privacy in mind:

> "Privacy is not an afterthought—it's the foundation of everything we build."

## Conclusion

As mobile threats continue to evolve, organizations need security solutions that go beyond traditional approaches. Sentinel Systems provides the comprehensive protection that modern enterprises require.

For more information, visit our [website](https://sentinelsystems.com) or [contact our team](mailto:sales@sentinelsystems.com).
`,
  publishedAt: new Date('2024-01-15'),
};

console.log('Example 5: Blog Post Simulation');
console.log('Title:', blogPost.title);
console.log('Published:', blogPost.publishedAt.toLocaleDateString());
console.log('Read time:', calculateReadTime(blogPost.content), 'minutes');
console.log('\nHTML Output (first 500 chars):');
const htmlOutput = parseMarkdown(blogPost.content);
console.log(htmlOutput.substring(0, 500) + '...');
console.log('\n---\n');

// Example 6: Read time calculation
const shortContent = 'This is a short blog post with about fifty words. '.repeat(1);
const mediumContent = 'This is a medium blog post with about two hundred words. '.repeat(20);
const longContent = 'This is a long blog post with about one thousand words. '.repeat(100);

console.log('Example 6: Read Time Calculation');
console.log('Short content (50 words):', calculateReadTime(shortContent), 'minutes');
console.log('Medium content (400 words):', calculateReadTime(mediumContent), 'minutes');
console.log('Long content (1000 words):', calculateReadTime(longContent), 'minutes');
