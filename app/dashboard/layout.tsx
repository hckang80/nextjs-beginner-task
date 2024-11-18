"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log({ pathname });
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="wrap">
      <header className="global-header">
        <h1>cliwant</h1>
      </header>
      <div className="global-inner">
        <aside className="global-aside">
          <nav className="global-nav">
            <Link href="/dashboard" className="global-main-item">
              대시보드
            </Link>
            <details open>
              <summary className="global-main-item">입찰검색</summary>
              <ul className="global-sub-menu">
                <li className="global-sub-menu__item">
                  <Link
                    href="/dashboard/rfp"
                    className={isActive("/dashboard/rfp") ? "is-active" : ""}
                  >
                    국내입찰
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/bid_favorites"
                    className={
                      isActive("/dashboard/bid_favorites") ? "is-active" : ""
                    }
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
