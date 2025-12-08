'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, error, icon, type, className = '', ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-12 px-4 ${icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''}
              bg-[var(--input)] text-[var(--foreground)]
              border rounded-[var(--radius-default)]
              placeholder:text-[var(--muted-foreground)]
              focus:outline-none focus:ring-[3px] focus:ring-[var(--ring)]/40
              transition-all duration-150
              ${error
                ? 'border-[var(--accent-error)] focus:ring-[var(--accent-error)]/40'
                : 'border-[var(--border)] hover:border-[var(--border)]/50'
              }
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-2 text-sm text-[var(--error-foreground)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
