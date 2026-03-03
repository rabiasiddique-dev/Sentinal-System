import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[120px] w-full rounded-md glass border border-cyber-gray-700 bg-cyber-gray-900/50 px-4 py-3 text-base text-foreground placeholder:text-cyber-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:border-cyber-green transition-all disabled:cursor-not-allowed disabled:opacity-50 resize-y ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
