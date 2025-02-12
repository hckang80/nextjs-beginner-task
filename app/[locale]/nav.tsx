'use client';

import { useNavigation } from '@/hooks/use-navigation';
import { cn } from '@/lib';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Nav = {
  name: string;
  path: string;
  items?: Nav[];
};

export default function DashboardNav() {
  const navigation = useNavigation();
  const { locale } = useParams();
  const { t } = useTranslation();

  const mainNav: Nav[] = [
    {
      name: t('bidSearch'),
      path: '/dashboard',
      items: [
        { name: '국내입찰', path: '/dashboard/rfp' },
        { name: '관심공고', path: '/dashboard/bid_favorites' }
      ]
    },
    {
      name: '산업분석',
      path: '/analysis',
      items: [{ name: '공급기업', path: '/analysis/supplier' }]
    }
  ];

  return (
    <nav className="global-nav">
      {mainNav.map(({ name, path: depth1, items }, i) => (
        <details name="nav" key={depth1} open={!i}>
          <summary
            className={cn(
              'global-main-item',
              navigation.isActive(`/${locale}${depth1}`) ? 'is-active' : ''
            )}
          >
            {name}
            {items && <ChevronDown size={16} />}
          </summary>
          {items && (
            <List>
              {items.map(({ name, path: depth2 }) => (
                <List.Item key={depth2}>
                  <Link
                    href={`/${locale}${depth2}`}
                    className={navigation.isActive(`/${locale}${depth2}`) ? 'is-active' : ''}
                  >
                    {name}
                  </Link>
                </List.Item>
              ))}
            </List>
          )}
        </details>
      ))}
    </nav>
  );
}

const List = Object.assign(ListMain, {
  Item: ListItem
});

function ListMain({ children }: { children: ReactNode }) {
  return <ul className="global-sub-menu">{children}</ul>;
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="global-sub-menu__item">{children}</li>;
}
