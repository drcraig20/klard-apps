'use client';

import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const alertBannerVariants = cva(
  'alert-base grid grid-cols-[auto_1fr_auto] gap-2 rounded-[var(--radius-default)] border px-4 py-3 data-[slot=alert-banner]',
  {
    variants: {
      type: {
        success: 'alert-success border-[color:var(--rec-color-success)]/35 bg-[color:var(--rec-color-success)]/10 text-[color:var(--rec-color-success)]',
        error: 'alert-error border-[color:var(--rec-color-error)]/35 bg-[color:var(--rec-color-error)]/10 text-[color:var(--rec-color-error)]',
        warning: 'alert-warning border-[color:var(--rec-color-warning)]/35 bg-[color:var(--rec-color-warning)]/10 text-[color:var(--rec-color-warning)]',
        info: 'alert-info border-[color:var(--rec-color-secondary)]/35 bg-[color:var(--rec-color-secondary)]/10 text-[color:var(--rec-color-secondary)]',
      },
      size: {
        default: 'alert-default',
        compact: 'alert-compact px-3 py-2 text-sm',
      },
    },
    defaultVariants: {
      type: 'info',
      size: 'default',
    },
  }
);

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface AlertBannerProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>,
    Omit<VariantProps<typeof alertBannerVariants>, 'type'> {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export function AlertBanner({
  type = 'info',
  size = 'default',
  title,
  children,
  action,
  dismissible = false,
  onDismiss,
  icon,
  className,
  ...props
}: AlertBannerProps) {
  const Icon = icons[type];
  const handleDismiss = () => {
    onDismiss?.();
  };

  return (
    <Alert
      data-slot="alert-banner"
      role="alert"
      aria-live="polite"
      className={cn(alertBannerVariants({ type, size }), className)}
      {...props}
    >
      <div className="mt-0.5">
        {icon ?? <Icon data-testid="alert-icon" className="h-4 w-4" aria-hidden />}
      </div>
      <div className="space-y-1">
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        <AlertDescription className="text-sm text-[color:inherit]">{children}</AlertDescription>
        {action ? <div className="mt-1">{action}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rec-color-secondary)]"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </Alert>
  );
}
