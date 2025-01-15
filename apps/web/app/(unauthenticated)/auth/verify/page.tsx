import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { VerifyForm } from '../components/verify-form';

export default async function VerifyAuth() {
  const session = await currentUser();
  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center space-y-12 lg:max-w-lg">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-4xl">Verify Account</h1>
        <p className="text-muted-foreground">
          Enter the 6 digit code we sent to your email address to verify your
          new account:
        </p>
      </div>
      <VerifyForm user={session.user} />
    </div>
  );
}
