/**
 * Unit tests for Resend email service
 */

import { ResendEmailService } from '../resend-service';
import { LeadEmailData } from '../types';

// Mock the Resend module
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(),
      },
    })),
  };
});

describe('ResendEmailService', () => {
  const mockApiKey = 'test-api-key';
  const mockFromEmail = 'notifications@test.com';
  const mockAdminEmail = 'admin@test.com';

  const mockLead: LeadEmailData = {
    name: 'John Doe',
    email: 'john@example.com',
    organization: 'Acme Corp',
    organizationType: 'corporate',
    deploymentSize: '201-1000',
    message: 'Interested in enterprise deployment.',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create instance with valid parameters', () => {
      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      expect(service).toBeInstanceOf(ResendEmailService);
    });

    it('should throw error if API key is missing', () => {
      expect(() => {
        new ResendEmailService('', mockFromEmail, mockAdminEmail);
      }).toThrow('Resend API key is required');
    });

    it('should throw error if from email is missing', () => {
      expect(() => {
        new ResendEmailService(mockApiKey, '', mockAdminEmail);
      }).toThrow('From email address is required');
    });

    it('should throw error if admin email is missing', () => {
      expect(() => {
        new ResendEmailService(mockApiKey, mockFromEmail, '');
      }).toThrow('Admin email address is required');
    });
  });

  describe('sendLeadNotification', () => {
    it('should send email with correct parameters', async () => {
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockResolvedValue({
        data: { id: 'test-email-id' },
        error: null,
      });
      
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      await service.sendLeadNotification(mockLead);

      expect(mockSend).toHaveBeenCalledTimes(1);
      
      const callArgs = mockSend.mock.calls[0][0];
      
      // Verify email parameters (Requirements 24.1, 24.2)
      expect(callArgs.from).toBe(mockFromEmail);
      expect(callArgs.to).toBe(mockAdminEmail); // Requirement 24.2
      expect(callArgs.subject).toContain('Acme Corp');
      expect(callArgs.subject).toContain('201-1000');
      expect(callArgs.html).toBeDefined();
      expect(callArgs.text).toBeDefined();
      expect(callArgs.replyTo).toBe(mockLead.email);
      
      // Verify tags are included
      expect(callArgs.tags).toEqual([
        { name: 'type', value: 'lead-notification' },
        { name: 'organization-type', value: 'corporate' },
        { name: 'deployment-size', value: '201-1000' },
      ]);
    });

    it('should include all lead details in email content', async () => {
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockResolvedValue({
        data: { id: 'test-email-id' },
        error: null,
      });
      
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      await service.sendLeadNotification(mockLead);

      const callArgs = mockSend.mock.calls[0][0];
      
      // Verify all lead details are in HTML (Requirements 24.3-24.8)
      expect(callArgs.html).toContain('John Doe'); // 24.3
      expect(callArgs.html).toContain('john@example.com'); // 24.4
      expect(callArgs.html).toContain('Acme Corp'); // 24.5
      expect(callArgs.html).toContain('201-1000'); // 24.6
      expect(callArgs.html).toContain('Interested in enterprise deployment'); // 24.7
      // Timestamp is formatted (24.8)
      
      // Verify all lead details are in text
      expect(callArgs.text).toContain('John Doe');
      expect(callArgs.text).toContain('john@example.com');
      expect(callArgs.text).toContain('Acme Corp');
      expect(callArgs.text).toContain('201-1000');
      expect(callArgs.text).toContain('Interested in enterprise deployment');
    });

    it('should throw error if Resend API returns error', async () => {
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'API error' },
      });
      
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      
      await expect(service.sendLeadNotification(mockLead)).rejects.toThrow(
        'Failed to send lead notification: Resend API error: API error'
      );
    });

    it('should throw error if Resend API throws exception', async () => {
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockRejectedValue(new Error('Network error'));
      
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      
      await expect(service.sendLeadNotification(mockLead)).rejects.toThrow(
        'Failed to send lead notification: Network error'
      );
    });

    it('should log success message when email is sent', async () => {
      const { Resend } = require('resend');
      const mockSend = jest.fn().mockResolvedValue({
        data: { id: 'test-email-id-123' },
        error: null,
      });
      
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const service = new ResendEmailService(mockApiKey, mockFromEmail, mockAdminEmail);
      await service.sendLeadNotification(mockLead);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Lead notification sent successfully')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('test-email-id-123')
      );

      consoleSpy.mockRestore();
    });
  });
});
