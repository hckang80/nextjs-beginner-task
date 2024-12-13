'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className="global-nav">
      <details name="nav" open>
        <summary className="global-main-item">입찰검색</summary>
        <ul className="global-sub-menu">
          <li className="global-sub-menu__item">
            <Link href="/dashboard/rfp" className={isActive('/dashboard/rfp') ? 'is-active' : ''}>
              국내입찰
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/bid_favorites"
              className={isActive('/dashboard/bid_favorites') ? 'is-active' : ''}
            >
              관심공고
            </Link>
          </li>
        </ul>
      </details>
      <details name="nav">
        <summary className="global-main-item">산업분석</summary>
        <ul className="global-sub-menu">
          <li className="global-sub-menu__item">
            <Link
              href="/analysis/supplier"
              className={isActive('/analysis/supplier') ? 'is-active' : ''}
            >
              공급기업
            </Link>
          </li>
        </ul>
      </details>
    </nav>
  );
}
