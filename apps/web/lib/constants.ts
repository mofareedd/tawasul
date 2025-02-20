import type { LucideIcon } from 'lucide-react';
import type { NavItem } from './types';

export interface INavLinks {
  title: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
  href: string;
}

export const navItems: NavItem[] = [
  {
    title: 'Feed',
    url: '/',
    icon: 'feed',
    isActive: false,
  },
  {
    title: 'Friends',
    url: '/friends',
    icon: 'friends',
    isActive: false,
  },
  {
    title: 'Groups',
    url: '/groups',
    icon: 'group',
    isActive: false,
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: 'messages',
    isActive: false,
  },
  {
    title: 'Setting',
    url: '/settings',
    icon: 'settings',
    isActive: false,
  },
];
