'use client';
import { signOut } from '@sandoq/auth';
import { Button } from '@sandoq/ui/components/button';

export default function App() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl">Hello World</h1>
        <Button size="sm">Home Page</Button>
        <Button size="sm" onClick={async () => await signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
