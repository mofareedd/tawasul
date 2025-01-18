'use client';
import Link from 'next/link';

import type { INavLinks } from '@/lib/constants';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tawasul/ui/components/avatar';
import { buttonVariants } from '@tawasul/ui/components/button';
import { Separator } from '@tawasul/ui/components/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tawasul/ui/components/tooltip';
import { cn } from '@tawasul/ui/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavProps {
  links: INavLinks[];
}

export function Nav({ links }: NavProps) {
  const pathname = usePathname(); // p

  return (
    <TooltipProvider delayDuration={0}>
      <div className="group flex h-full flex-col gap-4 py-2">
        <nav className="h-full px-2">
          <div className="flex h-full flex-col items-center justify-between px-2 sm:hidden">
            <div className="flex flex-col items-center gap-1">
              <div className="relative h-8 w-8">
                <Image src={'/logo.png'} alt="logo" className="absolute" fill />
              </div>
              <Separator className="my-4" />
              {links.map((link, index) => {
                const isActive =
                  pathname.endsWith(link.href) ||
                  (link.href.startsWith(pathname) && pathname !== '/');
                return (
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          // buttonVariants({ variant: link.variant, size: 'icon' }),
                          buttonVariants({
                            variant: isActive ? 'default' : 'ghost',

                            size: 'icon',
                          }),
                          'h-9 w-9',
                          link.variant === 'default' &&
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="flex items-center gap-4"
                    >
                      {link.title}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            <Link href={'/'} className="">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="hidden gap-1 sm:grid">
            {links.map((link, index) => {
              const isActive =
                pathname.endsWith(link.href) ||
                (link.href.startsWith(pathname) && pathname !== '/');
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? 'default' : 'ghost',
                      size: 'lg',
                    }),
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                    'justify-start'
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}
