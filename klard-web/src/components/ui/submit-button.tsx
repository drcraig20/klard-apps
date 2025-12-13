import { Button } from './button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({
  isSubmitting,
  children,
  className
}: Readonly<SubmitButtonProps>) {
  return (
    <Button
      type="submit"
      variant="klard"
      size="lg"
      loading={isSubmitting}
      className={cn("w-full", className)}
    >
      {children}
    </Button>
  );
}
