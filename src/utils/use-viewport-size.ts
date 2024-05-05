import { useEffect, useState } from 'react';

export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<{
    width: number | null;
    height: number | null;
  }>({ width: null, height: null });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return viewportSize;
};
