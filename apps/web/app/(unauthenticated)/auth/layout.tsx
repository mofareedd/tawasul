import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { AuthBackground } from './_components/auth-bg';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await currentUser();

  if (session && session.user.emailVerified!) {
    redirect('/');
  }
  return (
    <main className="flex min-h-screen w-full">
      <section className="flex-1 px-10 py-6">
        <h3 className="font-bold text-2xl">tawasul.</h3>
        {children}
      </section>
      {/* <ThemeToggle /> */}
      <AuthBackground />
    </main>
  );
}
