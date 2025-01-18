import SiteHeader from '@/components/site-header';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { Sidebar } from './components/sidebar';

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await currentUser();

  if (!session || !session?.user.emailVerified) {
    redirect('/auth/sign-in');
  }

  return (
    <main className="bg-accent">
      <div className="container mx-auto">
        <SiteHeader />
        <div className="flex h-screen overflow-hidden sm:h-[calc(100vh-56px)] sm:space-x-6 sm:py-4">
          <Sidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
