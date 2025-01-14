import { useEffect, useState } from 'react';

export function useTimer(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      return;
    }

    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(seconds);
  };

  return {
    timeLeft,
    isActive,
    start,
    stop,
    reset,
  };
}
