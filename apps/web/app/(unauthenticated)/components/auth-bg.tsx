'use client';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function AuthBackground() {
  return (
    <section className="relative hidden flex-1 lg:flex">
      <div className="relative z-10 flex w-full items-start justify-end bg-none px-10 py-4">
        <Link
          href={''}
          className="rounded-full border border-white px-6 py-1 font-bold text-md text-white hover:bg-accent"
        >
          Sign-in
        </Link>
      </div>
      <Image
        src="/auth-bg.png"
        alt="Picture of the author"
        fill={true}
        objectFit="cover"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black/40" />

      <div className="absolute bottom-24 left-10 max-w-2xl space-y-4 font-bold text-4xl text-white">
        <Quote size={'32'} />
        <h2 className="">
          Your stories matter—share them with the people who care.
        </h2>
      </div>
    </section>
  );
}
