import { cva } from 'class-variance-authority';

/**
 * AppSidebar Variants with Bold Gradient and Glassmorphism
 *
 * SOLID Compliance:
 * - SRP: Only sidebar styling variants
 * - OCP: Add new variants without modifying existing
 */

/**
 * Sidebar container variants with teal-to-emerald gradient background
 * and glassmorphism effects
 */
export const sidebarContainerVariants = cva(
  // Base styles: gradient background with glassmorphism
  [
    'flex flex-col h-full',
    'bg-linear-to-br from-primary to-emerald-400',
    'backdrop-blur-lg',
    'border-r border-white/10',
  ],
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

/**
 * Navigation item variants with active state glow effect
 */
export const navItemVariants = cva(
  // Base styles: flex layout with transitions
  [
    'flex items-center gap-3 px-4 py-2.5 rounded-lg',
    'transition-all duration-200 ease-in-out',
    'text-white/90',
    '[&>svg]:size-5 [&>svg]:shrink-0',
  ],
  {
    variants: {
      active: {
        true: [
          'bg-white/20',
          'shadow-[var(--rec-glow-primary)]',
          'text-white font-medium',
          'border border-white/20',
        ],
        false: [
          'hover:bg-white/10',
          'hover:text-white',
          'border border-transparent',
        ],
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

/**
 * Sidebar header variants
 */
export const sidebarHeaderVariants = cva(
  [
    'flex items-center gap-2 px-4 py-4',
    'border-b border-white/10',
  ],
  {
    variants: {
      collapsed: {
        true: 'justify-center px-2',
        false: 'justify-start',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

/**
 * Sidebar group label variants
 */
export const groupLabelVariants = cva(
  [
    'px-4 py-2 text-xs font-semibold uppercase tracking-wider',
    'text-white/60',
  ],
  {
    variants: {
      collapsed: {
        true: 'sr-only',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

/**
 * Badge variants for nav items
 */
export const navBadgeVariants = cva(
  [
    'flex items-center justify-center',
    'min-w-5 h-5 px-1.5',
    'rounded-full text-xs font-medium',
    'bg-white/20 text-white',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/20',
        alert: 'bg-red-500/80 text-white',
        success: 'bg-emerald-500/80 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
