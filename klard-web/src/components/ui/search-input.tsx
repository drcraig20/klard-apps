'use client';

import { forwardRef, useCallback, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Current search value (controlled) */
  value: string;
  /** Called immediately when input changes */
  onChange: (value: string) => void;
  /** Called after debounce delay with search term */
  onSearch?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Show loading spinner instead of clear button */
  loading?: boolean;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      value,
      onChange,
      onSearch,
      placeholder = 'Search...',
      loading = false,
      debounceMs = 300,
      disabled,
      className,
      ...props
    },
    ref
  ) {
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const debouncedSearch = useCallback(
      (searchValue: string) => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          onSearch?.(searchValue);
        }, debounceMs);
      },
      [onSearch, debounceMs]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        debouncedSearch(newValue);
      },
      [onChange, debouncedSearch]
    );

    const handleClear = useCallback(() => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      onChange('');
      onSearch?.('');
    }, [onChange, onSearch]);

    const showClearButton = !loading && value.length > 0;

    return (
      <div data-slot="search-input" className={cn('relative', className)}>
        {/* Search icon */}
        <div
          data-slot="search-icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
        >
          <Search className="h-4 w-4" />
        </div>

        {/* Input */}
        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'pl-10 h-10',
            (loading || showClearButton) && 'pr-10'
          )}
          {...props}
        />

        {/* Loading spinner */}
        {loading && (
          <div
            data-slot="loading-spinner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        {/* Clear button */}
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300',
              'transition-colors p-1 rounded',
              'focus:outline-none focus:ring-2 focus:ring-primary/30',
              disabled && 'pointer-events-none opacity-50'
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);