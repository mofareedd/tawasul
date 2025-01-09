import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = (request: NextRequest) => {
  return request.url.startsWith('/dashboard'); // change this to your protected route
};

const authMiddleware = async (request: NextRequest) => {
  const url = new URL('/api/auth/get-session', request.nextUrl.origin);
  const response = await fetch(url, {
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  // console.log(await response.json());
  // console.log('🚀🚀🚀🚀🚀🚀🚀🚀');

  const session = await response.json();

  console.log(session);

  // if (!session) {
  //   return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  // }

  return NextResponse.next();
};

export default authMiddleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
