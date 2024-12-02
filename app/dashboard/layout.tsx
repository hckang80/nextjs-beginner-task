'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="wrap">
      <header className="global-header">
        <h1>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js"
            width={150}
            height={30}
            priority
          />
        </h1>
      </header>
      <div className="global-inner">
        <aside className="global-aside">
          <nav className="global-nav">
            <details open>
              <summary className="global-main-item">입찰검색</summary>
              <ul className="global-sub-menu">
                <li className="global-sub-menu__item">
                  <Link
                    href="/dashboard/rfp"
                    className={isActive('/dashboard/rfp') ? 'is-active' : ''}
                  >
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
          </nav>
        </aside>
        <main className="global-main">{children}</main>
      </div>
    </div>
  );
}
