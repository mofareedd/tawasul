import { buttonVariants } from '@tawasul/ui/components/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyAuth() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center space-y-12 lg:max-w-lg">
      <div className="space-y-4 text-center">
        <div className="relative flex items-center justify-center">
          <Image
            src="/email.png"
            alt="Picture of the author"
            // fill={true}
            width={320}
            height={320}
            objectFit="cover"
          />
        </div>
        <h1 className="font-bold text-4xl">Email Verified Successfully!</h1>
        <p className="text-muted-foreground">
          Thank you for verifying your email address. Your account is now fully
          activated.
        </p>
      </div>

      <Link
        href={'/auth/sign-in'}
        className={buttonVariants({ className: 'w-full' })}
      >
        <ArrowLeft size={20} /> <span>Back To Login</span>
      </Link>
    </div>
  );
}
