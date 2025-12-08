import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({ message, onDismiss, className }: ErrorBannerProps) {
  return (
    <div
      className={cn(
        "mb-6 p-4 rounded-[var(--radius-default)] bg-[var(--error-background)] border border-[var(--error-border)] flex items-start gap-3",
        className
      )}
      role="alert"
    >
      <AlertCircle className="w-5 h-5 text-[var(--error-foreground)] flex-shrink-0 mt-0.5" />
      <p className="text-sm text-[var(--error-foreground)] flex-1">
        {message}
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-[var(--error-foreground)] hover:opacity-70"
          aria-label="Dismiss error"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
