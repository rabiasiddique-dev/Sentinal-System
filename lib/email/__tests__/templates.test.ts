/**
 * Unit tests for email templates
 */

import { generateLeadNotificationHTML, generateLeadNotificationText } from '../templates';
import { LeadEmailData } from '../types';

describe('Email Templates', () => {
  const mockLead: LeadEmailData = {
    name: 'John Doe',
    email: 'john@example.com',
    organization: 'Acme Corp',
    organizationType: 'corporate',
    deploymentSize: '201-1000',
    message: 'Interested in enterprise deployment for our organization.',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  };

  describe('generateLeadNotificationHTML', () => {
    it('should generate valid HTML email', () => {
      const html = generateLeadNotificationHTML(mockLead);
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('</html>');
      expect(html).toContain('<h1>');
    });

    it('should include all lead details', () => {
      const html = generateLeadNotificationHTML(mockLead);
      
      // Check all required fields are present (Requirements 24.3-24.8)
      expect(html).toContain('John Doe'); // Name (24.3)
      expect(html).toContain('john@example.com'); // Email (24.4)
      expect(html).toContain('Acme Corp'); // Organization (24.5)
      expect(html).toContain('201-1000'); // Deployment size (24.6)
      expect(html).toContain('Interested in enterprise deployment'); // Message (24.7)
      // Timestamp is formatted, so just check it exists (24.8)
      expect(html).toMatch(/\d{4}/); // Year in timestamp
    });

    it('should escape HTML special characters', () => {
      const leadWithSpecialChars: LeadEmailData = {
        ...mockLead,
        name: '<script>alert("xss")</script>',
        message: 'Test & <b>bold</b> "quotes"',
      };
      
      const html = generateLeadNotificationHTML(leadWithSpecialChars);
      
      // Should escape HTML entities
      expect(html).toContain('&lt;script&gt;');
      expect(html).toContain('&amp;');
      expect(html).toContain('&lt;b&gt;');
      expect(html).toContain('&quot;');
      
      // Should NOT contain unescaped HTML
      expect(html).not.toContain('<script>alert');
      expect(html).not.toContain('<b>bold</b>');
    });

    it('should include mailto link for email', () => {
      const html = generateLeadNotificationHTML(mockLead);
      
      expect(html).toContain('mailto:john@example.com');
      expect(html).toContain('<a href="mailto:');
    });

    it('should include organization type badge', () => {
      const html = generateLeadNotificationHTML(mockLead);
      
      expect(html).toContain('badge-corporate');
      expect(html).toContain('Corporate');
    });

    it('should handle different organization types', () => {
      const types = ['government', 'defense', 'corporate', 'ngo', 'other'] as const;
      
      types.forEach(type => {
        const lead = { ...mockLead, organizationType: type };
        const html = generateLeadNotificationHTML(lead);
        
        expect(html).toContain(`badge-${type}`);
      });
    });
  });

  describe('generateLeadNotificationText', () => {
    it('should generate plain text email', () => {
      const text = generateLeadNotificationText(mockLead);
      
      expect(text).toContain('NEW LEAD SUBMISSION');
      expect(text).not.toContain('<html>');
      expect(text).not.toContain('<div>');
    });

    it('should include all lead details', () => {
      const text = generateLeadNotificationText(mockLead);
      
      // Check all required fields are present (Requirements 24.3-24.8)
      expect(text).toContain('Name: John Doe'); // Name (24.3)
      expect(text).toContain('Email: john@example.com'); // Email (24.4)
      expect(text).toContain('Organization: Acme Corp'); // Organization (24.5)
      expect(text).toContain('Deployment Size: 201-1000'); // Deployment size (24.6)
      expect(text).toContain('Interested in enterprise deployment'); // Message (24.7)
      expect(text).toContain('Submitted:'); // Timestamp (24.8)
    });

    it('should format organization type correctly', () => {
      const text = generateLeadNotificationText(mockLead);
      
      expect(text).toContain('Organization Type: Corporate');
    });

    it('should be readable without HTML', () => {
      const text = generateLeadNotificationText(mockLead);
      
      // Should have clear structure
      expect(text).toContain('===================');
      expect(text).toContain('Message:');
      expect(text).toContain('---');
    });
  });
});
