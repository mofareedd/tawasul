import { currentUser } from '@/lib/auth';
import { Button } from '@sandoq/ui/components/button';
import SiteHeader from './components/site-header';

export default async function App() {
  const session = await currentUser();
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl">Hello World</h1>
        <p>{session?.user.emailVerified ? 'Verified' : 'Not Verified'}</p>
        <Button className="">Home Page</Button>
        <SiteHeader />
      </div>
    </div>
  );
}
