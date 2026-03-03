interface LoadingSectionProps {
  title?: string;
  rows?: number;
  className?: string;
}

export default function LoadingSection({ 
  title = 'Loading...', 
  rows = 3,
  className = ''
}: LoadingSectionProps) {
  return (
    <div className={`relative py-20 bg-cyber-black ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 bg-cyber-gray-800 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-cyber-gray-800 rounded w-96 mx-auto"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="h-16 bg-cyber-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
