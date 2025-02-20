import { SidebarTrigger } from '@tawasul/ui/components/sidebar';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 block md:hidden" />
        <h2 className="text-lg">Feed</h2>
      </div>

      <div className="flex items-center gap-2 px-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
