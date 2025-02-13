'use client';

import { authClient } from '@tawasul/auth/client';
import { Button } from '@tawasul/ui/components/button';

export default function Logout() {
  return (
    <Button
      size="sm"
      onClick={async () =>
        await authClient.signOut({}, { onSuccess: () => location.reload() })
      }
    >
      Logout
    </Button>
  );
}
