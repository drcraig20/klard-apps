export const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  trial: { label: 'Trial', variant: 'warning' as const },
  paused: { label: 'Paused', variant: 'default' as const },
  cancelled: { label: 'Cancelled', variant: 'default' as const },
  expired: { label: 'Expired', variant: 'error' as const },
};

export const billingCycleLabels = {
  monthly: '/mo',
  quarterly: '/qtr',
  yearly: '/yr',
};
