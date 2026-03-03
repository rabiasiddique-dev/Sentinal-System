import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-cyber-green text-cyber-black hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105',
      secondary: 'glass border-cyber-green text-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]',
      ghost: 'text-cyber-green hover:bg-cyber-green/10',
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
