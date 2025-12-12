'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  label: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  ariaLabel?: string;
  className?: string;
}

type StepState = 'completed' | 'current' | 'upcoming';

/**
 * Derive step state based on index and currentStep
 * Respects explicit status prop if provided
 */
function getStepState(index: number, currentStep: number, explicitStatus?: StepState): StepState {
  if (explicitStatus) return explicitStatus;
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

const circleStyles: Record<StepState, string> = {
  completed: 'bg-teal-600 dark:bg-teal-500 text-white',
  current: 'bg-teal-600 dark:bg-teal-500 text-white ring-4 ring-teal-100 dark:ring-teal-900',
  upcoming: 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
};

const labelStyles: Record<StepState, string> = {
  completed: 'text-slate-900 dark:text-slate-100',
  current: 'text-slate-900 dark:text-slate-100 font-medium',
  upcoming: 'text-slate-500 dark:text-slate-400',
};

function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  ariaLabel,
  className,
}: StepperProps) {
  // Return null for empty steps
  if (!steps || steps.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Stepper] No steps provided');
    }
    return null;
  }

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      data-slot="stepper"
      className={cn(
        'flex',
        isHorizontal ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      <ol
        role="list"
        aria-label={ariaLabel ?? 'Progress'}
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-center w-full' : 'flex-col gap-4'
        )}
      >
        {steps.map((step, index) => {
          const state = getStepState(index, currentStep, step.status);
          const isLast = index === steps.length - 1;

          return (
            <li
              key={index}
              role="listitem"
              className={cn(
                'flex',
                isHorizontal ? 'items-center' : 'flex-col',
                isHorizontal && !isLast && 'flex-1'
              )}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <div className={cn('flex items-center gap-2', !isHorizontal && 'gap-3')}>
                {/* Step Circle */}
                <div
                  data-state={state}
                  data-testid={state === 'completed' ? 'step-completed' : undefined}
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-200',
                    circleStyles[state]
                  )}
                >
                  {state === 'completed' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="flex flex-col min-w-0">
                  <span className={cn('text-sm', labelStyles[state])}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Horizontal Connector */}
              {!isLast && isHorizontal && (
                <div
                  data-slot="connector"
                  className={cn(
                    'mx-4 h-0.5 flex-1 rounded-full transition-colors',
                    index < currentStep
                      ? 'bg-teal-600 dark:bg-teal-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Vertical Connector */}
              {!isLast && !isHorizontal && (
                <div
                  data-slot="connector"
                  className={cn(
                    'ml-4 mt-2 h-8 w-0.5 rounded-full transition-colors',
                    index < currentStep
                      ? 'bg-teal-600 dark:bg-teal-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export { Stepper };
