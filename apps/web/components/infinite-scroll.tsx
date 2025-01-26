import type { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollrProps extends PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

export default function InfiniteScroll({
  children,
  onBottomReached,
  className,
}: InfiniteScrollrProps) {
  const { ref } = useInView({
    rootMargin: '200px',
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
}
