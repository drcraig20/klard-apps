'use client';

import { forwardRef, useState, useId } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  inputFieldVariants,
  labelStyles,
  errorStyles,
  helperTextStyles,
  iconButtonStyles,
  leftIconStyles,
  inputContainerStyles,
} from '@/lib/form-field-styles';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input type - affects keyboard on mobile and validation */
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';
  /** Label text displayed above the input */
  label?: string;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Icon displayed on the left side of input */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right side of input (not shown for password/search types) */
  rightIcon?: React.ReactNode;
  /** Clear handler for search inputs */
  onClear?: () => void;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      type = 'text',
      label,
      error,
      helperText,
      required,
      leftIcon,
      rightIcon,
      value,
      onChange,
      onClear,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const isSearch = type === 'search';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Determine if we should show a right-side action button
    const hasRightAction = isPassword || (isSearch && value);
    const showRightIcon = rightIcon && !hasRightAction;

    const handleClear = () => {
      // Create a synthetic event for react-hook-form compatibility
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      onClear?.();
    };

    // Build aria-describedby for accessibility
    const describedBy = [
      error ? `${id}-error` : null,
      helperText && !error ? `${id}-helper` : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className={labelStyles}>
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className={inputContainerStyles}>
          {leftIcon && (
            <div className={leftIconStyles}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy}
            className={cn(
              inputFieldVariants({
                hasError: !!error,
                disabled: !!disabled,
                hasLeftIcon: !!leftIcon,
                hasRightIcon: !!(hasRightAction || showRightIcon),
              }),
              className
            )}
            {...props}
          />
          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={cn(iconButtonStyles, disabled && 'pointer-events-none')}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {/* Search clear button */}
          {isSearch && value && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className={cn(iconButtonStyles, disabled && 'pointer-events-none')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          {/* Right icon (only shown if no action button) */}
          {showRightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {/* Error message */}
        {error && (
          <p id={`${id}-error`} className={errorStyles} role="alert">
            {error}
          </p>
        )}
        {/* Helper text */}
        {helperText && !error && (
          <p id={`${id}-helper`} className={helperTextStyles}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
