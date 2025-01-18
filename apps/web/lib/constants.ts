import {
  Boxes,
  Handshake,
  LayoutGrid,
  type LucideIcon,
  Mail,
  Settings,
} from 'lucide-react';

export interface INavLinks {
  title: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
  href: string;
}
export const navLinks: INavLinks[] = [
  {
    title: 'Feed',
    icon: LayoutGrid,
    variant: 'default',
    href: '/feed',
  },
  {
    title: 'Friends',
    icon: Handshake,
    variant: 'ghost',
    href: '/friends',
  },
  {
    title: 'Community',
    icon: Boxes,
    variant: 'ghost',
    href: '/community',
  },
  {
    title: 'Messages',
    icon: Mail,
    variant: 'ghost',
    href: '/messages',
  },
  {
    title: 'Settings',
    icon: Settings,
    variant: 'ghost',
    href: '/settings',
  },
];
