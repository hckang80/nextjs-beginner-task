'use client';

import { BoardList, KeywordContainer, ChannelContainer } from '.';
import { Card } from '@/components/ui/card';
import { ProductPagination } from '../product-pagination';
import { useLayoutData } from './LayoutContextProvider';
import { useQuery } from '@tanstack/react-query';
import { fetcher, KeywordSet } from '@/lib';
import { useTranslations } from 'next-intl';

export default function Container({ offset }: { offset: number }) {
  const {
    data: [{ products, totalProducts }, keywordSets]
  } = useLayoutData();

  const t = useTranslations('Navigation');

  const LIST_PER_PAGE = 5;

  const { data } = useQuery({
    queryKey: ['keywordSets'],
    queryFn: () => fetcher<KeywordSet[]>('/keywordSets.json'),
    initialData: keywordSets
  });

  return (
    <div>
      <header className="flex items-center justify-between mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">{t('domesticBidding')}</h2>
      </header>

      <div className="grid gap-[15px]">
        <Card className="p-6">{keywordSets && <KeywordContainer keywordSets={data} />}</Card>

        <Card className="p-6">
          <ChannelContainer />
        </Card>

        <BoardList products={products} offset={offset} listPerPage={LIST_PER_PAGE} />

        {LIST_PER_PAGE < totalProducts && (
          <ProductPagination
            productsPerPage={LIST_PER_PAGE}
            offset={offset}
            totalProducts={totalProducts}
          />
        )}
      </div>
    </div>
  );
}
