'use client';

import { signOut } from '@tawasul/auth';
import { Button } from '@tawasul/ui/components/button';

export default function Logout() {
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
