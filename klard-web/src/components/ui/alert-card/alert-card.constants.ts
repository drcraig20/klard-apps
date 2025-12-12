import { Bell, RefreshCw, Ban, AlertCircle, DollarSign, Info } from 'lucide-react';

export const alertTypeConfig = {
  renewal: {
    icon: RefreshCw,
    tone: 'info' as const,
  },
  payment_failed: {
    icon: AlertCircle,
    tone: 'error' as const,
  },
  service_blocked: {
    icon: Ban,
    tone: 'error' as const,
  },
  new_charge: {
    icon: DollarSign,
    tone: 'warning' as const,
  },
  card_expiring: {
    icon: AlertCircle,
    tone: 'warning' as const,
  },
  system: {
    icon: Info,
    tone: 'info' as const,
  },
} as const;

export type AlertType = keyof typeof alertTypeConfig;
