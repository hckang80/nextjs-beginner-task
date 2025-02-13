'use client';

import { usePathname } from '@/i18n/routing';

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
