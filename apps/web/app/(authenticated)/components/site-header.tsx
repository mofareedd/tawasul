'use client';

import { signOut } from '@sandoq/auth';
import { Button } from '@sandoq/ui/components/button';

export default function SiteHeader() {
  return (
    <Button
      size="sm"
      onClick={async () =>
        await signOut({}, { onSuccess: () => location.reload() })
      }
    >
      Logout
    </Button>
  );
}
