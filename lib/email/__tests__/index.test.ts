/**
 * Unit tests for email service factory
 */

import { createEmailService, getEmailService, resetEmailService } from '../index';
import { ResendEmailService } from '../resend-service';

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

describe('Email Service Factory', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    resetEmailService();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('createEmailService', () => {
    it('should create ResendEmailService when EMAIL_SERVICE is resend', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      const service = createEmailService();
      expect(service).toBeInstanceOf(ResendEmailService);
    });

    it('should create ResendEmailService by default', () => {
      delete process.env.EMAIL_SERVICE;
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      const service = createEmailService();
      expect(service).toBeInstanceOf(ResendEmailService);
    });

    it('should use default from email if not provided', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';
      delete process.env.EMAIL_FROM;

      const service = createEmailService();
      expect(service).toBeInstanceOf(ResendEmailService);
    });

    it('should use custom from email if provided', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';
      process.env.EMAIL_FROM = 'custom@test.com';

      const service = createEmailService();
      expect(service).toBeInstanceOf(ResendEmailService);
    });

    it('should throw error if RESEND_API_KEY is missing', () => {
      process.env.EMAIL_SERVICE = 'resend';
      delete process.env.RESEND_API_KEY;
      process.env.ADMIN_EMAIL = 'admin@test.com';

      expect(() => createEmailService()).toThrow(
        'RESEND_API_KEY environment variable is required'
      );
    });

    it('should throw error if ADMIN_EMAIL is missing', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      delete process.env.ADMIN_EMAIL;

      expect(() => createEmailService()).toThrow(
        'ADMIN_EMAIL environment variable is required'
      );
    });

    it('should throw error for unsupported email service', () => {
      process.env.EMAIL_SERVICE = 'unsupported';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      expect(() => createEmailService()).toThrow(
        'Unsupported email service: unsupported'
      );
    });
  });

  describe('getEmailService', () => {
    it('should return singleton instance', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      const service1 = getEmailService();
      const service2 = getEmailService();

      expect(service1).toBe(service2);
    });

    it('should create new instance after reset', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      const service1 = getEmailService();
      resetEmailService();
      const service2 = getEmailService();

      expect(service1).not.toBe(service2);
    });
  });

  describe('resetEmailService', () => {
    it('should reset the singleton instance', () => {
      process.env.EMAIL_SERVICE = 'resend';
      process.env.RESEND_API_KEY = 'test-key';
      process.env.ADMIN_EMAIL = 'admin@test.com';

      getEmailService();
      resetEmailService();

      // Should create new instance on next call
      const service = getEmailService();
      expect(service).toBeInstanceOf(ResendEmailService);
    });
  });
});
