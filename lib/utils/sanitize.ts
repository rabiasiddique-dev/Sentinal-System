/**
 * Input sanitization utilities for security
 * Prevents XSS and injection attacks
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param text - The text to escape
 * @returns The escaped text safe for HTML output
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Sanitizes a string by trimming and escaping HTML
 * @param text - The text to sanitize
 * @returns The sanitized text
 */
export function sanitizeString(text: string): string {
  return escapeHtml(text.trim());
}

/**
 * Sanitizes MongoDB query objects by removing operators
 * Prevents NoSQL injection attacks
 * @param obj - The object to sanitize
 * @returns The sanitized object
 */
export function sanitizeMongoQuery(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized: any = {};
  for (const key in obj) {
    // Remove MongoDB operators that start with $
    if (key.startsWith('$')) continue;
    sanitized[key] = sanitizeMongoQuery(obj[key]);
  }
  return sanitized;
}
