// ============================================================================
// Password Requirements Configuration
// ============================================================================

export const LEVEL_WIDTHS = {
  weak: '25%' as const,
  fair: '50%' as const,
  good: '75%' as const,
  strong: '100%' as const,
} as const;

export const LEVEL_LABELS = {
  weak: 'Weak',
  fair: 'Fair',
  good: 'Good',
  strong: 'Strong',
} as const;

export const REQUIREMENT_LABELS = {
  minLength: 'At least 8 characters',
  hasUppercase: 'One uppercase letter',
  hasLowercase: 'One lowercase letter',
  hasNumber: 'One number',
  hasSpecial: 'One special character',
} as const;
