export default function DashboardAside({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <aside className="global-aside">{children}</aside>;
}
