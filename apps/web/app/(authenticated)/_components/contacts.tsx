import { Icons } from '@/components/icons';
import { UserAvatar } from '@/components/user/user-avatar';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { ScrollArea } from '@tawasul/ui/components/scroll-area';
import { Separator } from '@tawasul/ui/components/separator';
import Link from 'next/link';

export function Contacts() {
  return (
    <Card className="sticky top-16 right-0 hidden h-[calc(100vh-4rem)] w-64 rounded-none border-t-0 bg-sidebar p-0 text-sidebar-foreground lg:block">
      <ScrollArea className="h-full">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <p className="font-medium">Groups</p>
              <span className="text-muted-foreground text-sm">(2)</span>
            </div>
            <Icons.more />
          </div>
          <Separator />
          <div className="flex flex-col">
            <ContactGroupInfo />
            <ContactGroupInfo />
            <ContactGroupInfo />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <p className="font-medium">Contacts</p>
              <span className="text-muted-foreground text-sm">(11)</span>
            </div>
            <Icons.more />
          </div>
          <Separator />
          <div className="flex flex-col">
            <ContactGroupInfo />
            <ContactGroupInfo />
            <ContactGroupInfo />
            <ContactGroupInfo />
            <ContactGroupInfo />
            <ContactGroupInfo />
          </div>
          <Separator />
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

function ContactGroupInfo() {
  return (
    <Link
      href={''}
      className="flex w-full items-center gap-2 overflow-hidden px-4 py-3 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <UserAvatar name="Moe" />
      <div className="flex flex-col justify-center">
        <p className="text-xs">Nolan Franci</p>
        <span className="text-muted-foreground text-xs">812k Subscribers</span>
      </div>
    </Link>
  );
}
