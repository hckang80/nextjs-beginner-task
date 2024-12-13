'use client';

import { useNavigation } from '@/hooks/use-navigation';
import { cn } from '@/lib';
import Link from 'next/link';
import { ReactNode } from 'react';

type Nav = {
  name: string;
  path: string;
  children?: Nav[];
};

const mainNav: Nav[] = [
  {
    name: '입찰검색',
    path: 'dashboard',
    children: [
      { name: '국내입찰', path: 'dashboard/rfp' },
      { name: '관심공고', path: 'dashboard/bid_favorites' }
    ]
  },
  {
    name: '산업분석',
    path: 'analysis',
    children: [{ name: '공급기업', path: 'dashboard/supplier' }]
  }
];

export default function DashboardNav() {
  const navigation = useNavigation();

  return (
    <nav className="global-nav">
      {mainNav.map(({ name, path: depth1, children }, i) => (
        <details name="nav" key={depth1} open={!i}>
          <summary
            className={cn('global-main-item', navigation.isActive(depth1) ? 'is-active' : '')}
          >
            {name}
          </summary>
          {children && (
            <List>
              {children.map((child) => (
                <List.Item item={child} key={child.name} />
              ))}
            </List>
          )}
        </details>
      ))}
    </nav>
  );
}

export const List = Object.assign(ListMain, {
  Item: ListItem
});

export function ListMain({ children }: { children: ReactNode }) {
  return <ul className="global-sub-menu">{children}</ul>;
}

export function ListItem({ item: { name, path: depth2 } }: { item: Nav }) {
  const navigation = useNavigation();

  return (
    <li className="global-sub-menu__item" key={depth2}>
      <Link href={depth2} className={navigation.isActive(depth2) ? 'is-active' : ''}>
        {name}
      </Link>
    </li>
  );
}
