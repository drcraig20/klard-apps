import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export function SocialButton({
  provider,
  icon,
  isLoading,
  disabled,
  onClick,
  className
}: Readonly<SocialButtonProps>) {
  return (
    <button
      type="button"
      data-slot="social-button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "flex-1 h-12 flex items-center justify-center gap-2",
        "bg-transparent border border-border rounded-[var(--radius-default)]",
        "text-foreground font-medium",
        "hover:border-border/50 hover:bg-muted/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-all duration-150",
        className
      )}
    >
      {isLoading ? <LoadingSpinner size="md" /> : icon}
      <span>{provider}</span>
    </button>
  );
}
