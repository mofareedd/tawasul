import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { AuthBackground } from '../components/auth-bg';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await currentUser();

  if (session) {
    redirect('/');
  }
  return (
    <main className="flex min-h-screen w-full">
      {children}
      <AuthBackground />
    </main>
  );
}
