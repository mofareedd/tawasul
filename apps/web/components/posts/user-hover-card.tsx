'use client';
import { CalendarIcon } from 'lucide-react';

import type { Session } from '@/lib/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tawasul/ui/components/avatar';
import { Button } from '@tawasul/ui/components/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@tawasul/ui/components/hover-card';
import { format } from 'date-fns';
import { UserAvatar } from '../user/user-avatar';

interface IUserHoverCard {
  user: Session['user'];
}

export function UserHoverCard({ user }: IUserHoverCard) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="p-0 text-left hover:bg-transparent">
          <div className="flex space-x-2">
            <UserAvatar name={user.name} src={user.image ?? ''} />
            <div className="flex flex-col">
              <p className="text-foreground text-sm">{user.name}</p>
              <p className="text-[10px] text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.image ?? ''} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">@{user.username}</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                Joined {format(new Date(user.createdAt), 'MMMM yyyy')}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
