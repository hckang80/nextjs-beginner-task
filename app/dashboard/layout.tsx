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
        <aside className="global-aside">nav</aside>
        <main className="global-main">{children}</main>
      </div>
    </div>
  );
}
