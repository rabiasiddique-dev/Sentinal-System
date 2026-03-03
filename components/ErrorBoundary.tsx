'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

/**
 * ErrorBoundary Component
 * 
 * React error boundary that catches JavaScript errors anywhere in the component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 * 
 * Features:
 * - Catches rendering errors in child components
 * - Displays user-friendly error fallback UI
 * - Logs errors to console (can be extended to send to monitoring service)
 * - Provides reset functionality to recover from errors
 * - Cyber-themed styling consistent with the rest of the app
 * 
 * Requirements: 27.1
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console with timestamp
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] React Error Boundary caught an error:`);
    console.error(`[${timestamp}] [ERROR] Error:`, error);
    console.error(`[${timestamp}] [ERROR] Error Info:`, errorInfo);
    console.error(`[${timestamp}] [ERROR] Component Stack:`, errorInfo.componentStack);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to a monitoring service like Sentry
    // Example:
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    // }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-cyber-black flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <div className="bg-cyber-gray-900/50 backdrop-blur-sm border border-cyber-red/50 rounded-lg p-8 text-center">
              {/* Error icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-cyber-red/10 rounded-full mb-6">
                <AlertTriangle className="w-10 h-10 text-cyber-red" />
              </div>

              {/* Error message */}
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
                Something Went Wrong
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
              </p>

              {/* Error details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-cyber-gray-800 border border-cyber-gray-700 rounded-lg text-left">
                  <p className="text-sm font-mono text-cyber-red mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="text-sm text-gray-400 cursor-pointer hover:text-cyber-green">
                        Component Stack
                      </summary>
                      <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-64">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleReset}
                  variant="primary"
                  className="inline-flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="secondary"
                >
                  Go to Homepage
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 * 
 * Usage:
 * <ErrorBoundaryWrapper>
 *   <YourComponent />
 * </ErrorBoundaryWrapper>
 */
export function ErrorBoundaryWrapper({
  children,
  fallback,
  onError,
}: ErrorBoundaryProps): React.ReactElement {
  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
