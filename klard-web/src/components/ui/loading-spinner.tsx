import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'white';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
};

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className = ''
}: LoadingSpinnerProps) {
  const colorClass = variant === 'white'
    ? 'border-white border-t-transparent'
    : 'border-primary border-t-transparent';

  return (
    <div
      className={cn(sizeMap[size], 'border-2 rounded-full animate-spin', colorClass, className)}
      role="status"
      aria-label="Loading"
    />
  );
}
