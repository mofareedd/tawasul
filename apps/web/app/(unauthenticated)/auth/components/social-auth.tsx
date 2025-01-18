'use client';
import { IconGoogle } from '@/components/icons';
import { signIn } from '@tawasul/auth';
import { Button } from '@tawasul/ui/components/button';

export default function SocialAuth() {
  async function onSubmit() {
    await signIn.social({
      provider: 'google',
    });
  }
  return (
    <div className="w-full space-y-4">
      <Button onClick={onSubmit} variant="outline" className="w-full">
        <IconGoogle />
        Login with Google
      </Button>
    </div>
  );
}
