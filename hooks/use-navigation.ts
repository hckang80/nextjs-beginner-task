'use client';

import { usePathname } from 'next/navigation';

function useNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return {
    isActive
  };
}

export { useNavigation };
