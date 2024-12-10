import Image from 'next/image';
import Aside from './aside';
import Nav from './nav';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Aside>
          <Nav />
        </Aside>
        <main className="global-main">{children}</main>
      </div>
    </div>
  );
}
