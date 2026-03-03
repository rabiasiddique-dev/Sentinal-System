/**
 * Image blur placeholder utilities for Next.js Image optimization
 */

/**
 * Generate a simple blur data URL for image placeholders
 * This creates a tiny 10x10 pixel gradient that serves as a blur placeholder
 * 
 * @param color - Optional hex color for the blur (default: cyber green)
 * @returns Base64 encoded blur data URL
 */
export function generateBlurDataURL(color: string = '#00FF88'): string {
  // Convert hex to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Create a simple SVG gradient
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${r},${g},${b});stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:rgb(${r},${g},${b});stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="10" height="10" fill="url(#grad)" />
    </svg>
  `;

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate a shimmer effect blur placeholder
 * Creates an animated shimmer effect for loading states
 * 
 * @param width - Width of the shimmer
 * @param height - Height of the shimmer
 * @returns Base64 encoded shimmer data URL
 */
export function generateShimmerDataURL(width: number = 700, height: number = 475): string {
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#0B0B0F" offset="20%" />
          <stop stop-color="#1A1A1F" offset="50%" />
          <stop stop-color="#0B0B0F" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#0B0B0F" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Default blur placeholder for blog images
 */
export const DEFAULT_BLOG_BLUR = generateBlurDataURL('#00FF88');

/**
 * Default shimmer placeholder for loading states
 */
export const DEFAULT_SHIMMER = generateShimmerDataURL();
