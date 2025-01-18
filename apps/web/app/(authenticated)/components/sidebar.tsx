'use client';
import { navLinks } from '@/lib/constants';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { Nav } from './nav';
import { ProfileInfo } from './profile-info';

export function Sidebar() {
  return (
    <div className="flex w-20 flex-col overflow-hidden sm:w-60 sm:space-y-4 md:w-80">
      <div className="hidden sm:block">
        <ProfileInfo />
      </div>
      <Card className="flex-1 p-0 shadow-none">
        <CardContent className="h-full p-1">
          <Nav links={navLinks} />
        </CardContent>
      </Card>
    </div>
  );
}
