import type { Icons } from '@/components/icons';
import type { authClient } from '@tawasul/auth/client';

export type Session = typeof authClient.$Infer.Session;

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
}
