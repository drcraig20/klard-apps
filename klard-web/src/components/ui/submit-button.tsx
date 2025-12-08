import { LoadingSpinner } from './loading-spinner';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  isSubmitting: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({
  isSubmitting,
  loadingText = 'Submitting...',
  children,
  className
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="klard"
      size="lg"
      disabled={isSubmitting}
      className={cn("w-full", className)}
    >
      {isSubmitting ? (
        <>
          <LoadingSpinner size="md" variant="white" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
