'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormFieldIds } from '@/hooks';
import { calculatePasswordStrength } from '@klard-apps/commons';
import {
  inputFieldVariants,
  labelStyles,
  errorStyles,
  helperTextStyles,
  iconButtonStyles,
  inputContainerStyles,
} from '@/lib/form-field-styles';

// ============================================================================
// Types
// ============================================================================

interface PasswordRequirementsState {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Show password strength indicator */
  showStrength?: boolean;
  /** Password requirements checklist state */
  requirements?: PasswordRequirementsState;
}

// ============================================================================
// Sub-components (SRP: Each has single responsibility)
// ============================================================================

interface PasswordStrengthBarProps {
  password: string;
}

function PasswordStrengthBar({ password }: Readonly<PasswordStrengthBarProps>) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const levelColors: Record<string, string> = {
    weak: 'bg-red-500',
    fair: 'bg-amber-500',
    good: 'bg-emerald-500',
    strong: 'bg-primary',
  };

  const levelWidths: Record<string, string> = {
    weak: 'w-1/4',
    fair: 'w-1/2',
    good: 'w-3/4',
    strong: 'w-full',
  };

  const levelLabels: Record<string, string> = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  };

  return (
    <div className="mt-2 space-y-1" data-testid="password-strength-indicator">
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 rounded-full',
            levelColors[strength.level],
            levelWidths[strength.level]
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {levelLabels[strength.level]}
        </span>
        {strength.feedback.length > 0 && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {strength.feedback[0]}
          </span>
        )}
      </div>
    </div>
  );
}

interface PasswordRequirementsListProps {
  requirements: PasswordRequirementsState;
}

function PasswordRequirementsList({ requirements }: Readonly<PasswordRequirementsListProps>) {
  const requirementLabels: Record<keyof PasswordRequirementsState, string> = {
    minLength: 'At least 8 characters',
    hasUppercase: 'One uppercase letter',
    hasLowercase: 'One lowercase letter',
    hasNumber: 'One number',
    hasSpecial: 'One special character',
  };

  return (
    <div className="mt-3 space-y-1.5" data-testid="password-requirements">
      {(Object.entries(requirements) as [keyof PasswordRequirementsState, boolean][]).map(
        ([key, isMet]) => (
          <div
            key={key}
            data-requirement={key}
            className={cn(
              'flex items-center gap-2 text-sm transition-colors',
              isMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {isMet ? (
              <Check size={14} className="text-emerald-500 flex-shrink-0" />
            ) : (
              <X size={14} className="text-slate-400 flex-shrink-0" />
            )}
            <span>{requirementLabels[key]}</span>
          </div>
        )
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      label,
      error,
      helperText,
      required,
      showStrength,
      requirements,
      value,
      onChange,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) {
    const { inputId, errorId, helperId, describedBy } = useFormFieldIds(
      providedId,
      props.name ?? 'password',
      error,
      helperText
    );
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={labelStyles}
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        {/* Input with toggle */}
        <div className={inputContainerStyles}>
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy}
            autoComplete="current-password"
            className={cn(
              inputFieldVariants({
                hasError: !!error,
                disabled: !!disabled,
                hasRightIcon: true,
              }),
              className
            )}
            {...props}
          />

          {/* Visibility toggle button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className={cn(
              iconButtonStyles,
              disabled && 'pointer-events-none'
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className={errorStyles}
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            className={helperTextStyles}
          >
            {helperText}
          </p>
        )}

        {/* Strength indicator */}
        {showStrength && typeof value === 'string' && (
          <PasswordStrengthBar password={value} />
        )}

        {/* Requirements checklist */}
        {requirements && (
          <PasswordRequirementsList requirements={requirements} />
        )}
      </div>
    );
  }
);