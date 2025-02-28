import { AppSidebar } from '@/components/layout/app-sidebar';
import { SiteHeader } from '@/components/layout/site-header';
import { currentUser } from '@/lib/auth';
import { SidebarInset, SidebarProvider } from '@tawasul/ui/components/sidebar';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { Contacts } from './_components/contacts';
export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await currentUser();

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <SidebarProvider>
      <AppSidebar currentUser={session.user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex">
          <div className="min-h-screen flex-1 bg-accent px-3 py-4 2xl:px-14 dark:bg-background">
            {children}
          </div>
          <Contacts />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
