'use client';

import { usePathname, useParams } from 'next/navigation';

function useNavigation() {
  const pathname = usePathname();
  const { locale } = useParams();

  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}${path}`);
  };

  return {
    isActive
  };
}

export { useNavigation };
