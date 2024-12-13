'use client';

import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Nav = {
  name: string;
  path: string;
  children?: Nav[];
};

const navigation: Nav[] = [
  {
    name: '입찰검색',
    path: 'dashboard',
    children: [
      { name: '국내입찰', path: 'rfp' },
      { name: '관심공고', path: 'bid_favorites' }
    ]
  },
  {
    name: '산업분석',
    path: 'analysis',
    children: [{ name: '공급기업', path: 'supplier' }]
  }
];

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (...depths: string[]) => {
    const path = `/${[...depths].join('/')}`;

    return pathname.startsWith(path);
  };

  return (
    <nav className="global-nav">
      {navigation.map(({ name, path: depth1, children }, i) => (
        <details name="nav" key={depth1} open={!i}>
          <summary className={cn('global-main-item', isActive(depth1) ? 'is-active' : '')}>
            {name}
          </summary>
          {children && (
            <ul className="global-sub-menu">
              {children.map(({ name, path: depth2 }) => (
                <li className="global-sub-menu__item" key={depth2}>
                  <Link
                    href={`/${[depth1, depth2].join('/')}`}
                    className={isActive(depth1, depth2) ? 'is-active' : ''}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </nav>
  );
}
