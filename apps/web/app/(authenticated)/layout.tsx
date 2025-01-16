import { ThemeToggle } from '@/components/theme-toggle';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

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
    <main>
      <ThemeToggle />
      {children}
    </main>
  );
}
