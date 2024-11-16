import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrap">
      <header className="global-header">
        <h1>cliwant</h1>
      </header>
      <div className="global-inner">
        <aside className="global-aside">
          <nav className="global-nav">
            <Link href="/dashboard">대시보드</Link>
            <details open>
              <summary>입찰검색</summary>
              <ul className="global-menu">
                <li className="global-menu-item">
                  <Link href="/dashboard/rfp">국내입찰</Link>
                </li>
                <li>
                  <Link href="/dashboard/bid_favorites">관심공고</Link>
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
