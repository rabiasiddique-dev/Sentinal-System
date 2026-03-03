import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-cyber-green/10 text-cyber-green border-cyber-green/30',
      success: 'bg-cyber-green/20 text-cyber-green border-cyber-green',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
      error: 'bg-cyber-red/10 text-cyber-red border-cyber-red/30',
    };
    
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
