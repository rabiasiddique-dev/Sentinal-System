'use client';

import { useState } from 'react';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations/newsletter';

/**
 * NewsletterForm Component
 * 
 * A reusable newsletter subscription form with email validation,
 * loading states, and success/error message display.
 * 
 * Features:
 * - Client-side email validation using Zod schema
 * - Loading state during submission
 * - Success/error message display
 * - Handles duplicate subscription errors
 * - Cyber theme styling consistent with other components
 * - Fully accessible with proper labels and ARIA attributes
 * 
 * Requirements: 30.1, 30.3, 30.5
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Client-side validation using Zod schema
    const validationResult = newsletterSchema.safeParse({ email });
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues[0]?.message || 'Please enter a valid email address';
      setStatus('error');
      setMessage(errorMessage);
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: validationResult.data.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        // Handle specific error cases
        if (response.status === 429) {
          setStatus('error');
          setMessage('Too many requests. Please wait a moment and try again.');
        } else if (response.status === 409) {
          setStatus('error');
          setMessage('This email is already subscribed to our newsletter.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      // Handle network errors
      setStatus('error');
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setMessage('Network error. Please check your internet connection and try again.');
      } else {
        setMessage('Unable to connect. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === 'loading'}
          className="w-full px-4 py-2.5 bg-cyber-gray-800 border border-cyber-gray-700 rounded-lg text-white placeholder-cyber-gray-700 focus:outline-none focus:ring-2 focus:ring-cyber-green focus:border-transparent transition-all duration-200 text-sm disabled:opacity-50"
          required
          aria-describedby={message ? 'newsletter-message' : undefined}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-4 py-2.5 bg-cyber-green text-cyber-black font-semibold rounded-lg hover:shadow-glow-green transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p
          id="newsletter-message"
          className={`text-sm ${
            status === 'success' ? 'text-cyber-green' : 'text-cyber-red'
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </form>
  );
}
