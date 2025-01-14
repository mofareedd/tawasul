'use client';

import { QueryProvider } from '@sandoq/query/provider';
import { Toaster } from '@sandoq/ui/components/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </NextThemesProvider>
  );
}
