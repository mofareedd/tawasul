import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@tawasul/ui/components/sidebar';
import { Plus } from 'lucide-react';
import type * as React from 'react';
import { ProfileMenu } from '../user/profile-menu';

// This is sample data.
// const data = {
//   user: {
//     name: 'shadcn',
//     email: 'm@example.com',
//     avatar: '/avatars/shadcn.jpg',
//   },
//   calendars: [
//     {
//       name: 'My Calendars',
//       items: ['Personal', 'Work', 'Family'],
//     },
//     {
//       name: 'Favorites',
//       items: ['Holidays', 'Birthdays'],
//     },
//     {
//       name: 'Other',
//       items: ['Travel', 'Reminders', 'Deadlines'],
//     },
//   ],
// };

export function ContactsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex "
      {...props}
    >
      <SidebarContent>
        <ProfileMenu />
        {/* <DatePicker /> */}
        <SidebarSeparator className="mx-0" />
        {/* <Calendars calendars={data.calendars} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
