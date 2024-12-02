'use client';

import { KeywordSet, BidAnnouncementContext } from '@/lib';
import { BoardList, KeywordContainer, ChannelContainer } from '.';
import { Card } from '@/components/ui/card';
import { ProductPagination } from '../product-pagination';
import { useLayoutData } from './LayoutContextProvider';

export default function Container({
  offset
}: {
  initialData: {
    bidAnnouncementContextData: BidAnnouncementContext;
    keywordSetsData: KeywordSet[];
  };
  offset: number;
}) {
  const {
    data: [{ products, totalProducts }]
  } = useLayoutData();

  const LIST_PER_PAGE = 5;

  return (
    <div>
      <header className="flex items-center justify-between mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">입찰 공고</h2>
      </header>

      <div className="grid gap-[15px]">
        <details open className="contents">
          <summary>검색 숨기기</summary>

          <Card className="p-6">
            <KeywordContainer />
          </Card>

          <Card className="p-6">
            <ChannelContainer />
          </Card>
        </details>

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
