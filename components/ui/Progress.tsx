import * as React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = '', value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`relative h-3 w-full overflow-hidden rounded-full bg-cyber-gray-800 ${className}`}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-cyber-green to-cyber-green/80 transition-all duration-300 ease-in-out shadow-[0_0_10px_rgba(0,255,136,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
