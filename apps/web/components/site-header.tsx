'use client';
import { Bell, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import { ProfileMenu } from './profile-menu';
import { ThemeToggle } from './theme-toggle';
export default function SiteHeader() {
  return (
    <div className="hidden items-center justify-between overflow-hidden bg-background p-4 shadow-sm sm:flex sm:h-14 dark:bg-card">
      <div className="relative h-8 w-8">
        <Image src={'/logo.png'} alt="logo" className="absolute" fill />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <MessageSquareText className="h-5 w-5 text-foreground/80" />
        <Bell className="h-5 w-5 text-foreground/80" />
        <ProfileMenu />
      </div>
    </div>
  );
}
