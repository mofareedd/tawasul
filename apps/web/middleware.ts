import type { auth } from '@tawasul/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;

const isAuthPage = (request: NextRequest) => {
  return request.nextUrl.pathname.startsWith('/auth');
};

export default async function authMiddleware(request: NextRequest) {
  // const url = new URL('/api/auth/get-session', request.nextUrl.origin);
  // const response = await fetch(url, {
  //   headers: {
  //     cookie: request.headers.get('cookie') || '',
  //   },
  // });

  // const session: Session = await response.json();
  // console.log(session);

  // if (!isAuthPage(request) && !session) {
  //   return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
