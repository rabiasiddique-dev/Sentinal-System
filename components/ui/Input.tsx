import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-md glass border border-cyber-gray-700 bg-cyber-gray-900/50 px-4 py-2 text-base text-foreground placeholder:text-cyber-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:border-cyber-green transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
