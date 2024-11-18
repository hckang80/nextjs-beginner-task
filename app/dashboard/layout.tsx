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
        <h1>
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F542682c8b17017789cc2e977902e8281.cdn.bubble.io%2Ff1730178584582x927983228158931600%2FOG_Dark.png?w=150&h=84&auto=compress&dpr=1&fit=max"
            alt="cliwant"
            width="150"
            height="84"
          />
        </h1>
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

          <address className="global-address">
            <strong>법인명</strong> 주식회사 클라이원트
            <br />
            <strong>사업자 등록번호</strong> 169-87-03030
            <br />
            <strong>대표</strong> 조준호
            <br />
            <strong>연락처</strong> 010-6351-4802
            <br />
            <strong>주소</strong> 백범로31길 21, 서울창업허브 별관 108호
          </address>
        </aside>
        <main className="global-main">{children}</main>
      </div>
    </div>
  );
}
