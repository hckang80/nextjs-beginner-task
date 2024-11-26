'use client';

import { useEffect } from 'react';
import { KeywordSet, BidAnnouncementContext, fetcher } from '@/lib';
import { ProductsTable, DetailedSearch, ChannelSearch } from '.';
import { Card } from '@/components/ui/card';
import { useBidAnnouncement } from './context/BidAnnouncementContext';
import useSWR from 'swr';
import { ProductPagination } from '../product-pagination';

export default function Rfp({
  initialData: { bidAnnouncementContext, keywordSets },
  offset
}: {
  initialData: { bidAnnouncementContext: BidAnnouncementContext; keywordSets: KeywordSet[] };
  offset: number;
}) {
  const { setBidAnnouncementsContext, setKeywordSetsContext } = useBidAnnouncement();

  const { data, error } = useSWR(
    ['/bidAnnouncementContext.json', '/keywordSets.json'],
    ([url1, url2]) =>
      Promise.all([fetcher<BidAnnouncementContext>(url1), fetcher<KeywordSet[]>(url2)]),
    {
      fallbackData: [bidAnnouncementContext, keywordSets]
    }
  );

  useEffect(() => {
    if (data) {
      const [bidAnnouncementsContext, keywordSetsContext] = data;
      setBidAnnouncementsContext({ ...bidAnnouncementsContext, newOffset: offset });
      setKeywordSetsContext(keywordSetsContext);
    }
  }, [data, setBidAnnouncementsContext, setKeywordSetsContext, offset]);

  const { bidAnnouncementsContext } = useBidAnnouncement();

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const LIST_PER_PAGE = 5;

  const { products, newOffset, totalProducts } = bidAnnouncementsContext || {
    products: [],
    newOffset: 0,
    totalProducts: 0
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">입찰 공고</h2>
      </header>

      <div className="grid gap-[15px]">
        <details open className="contents">
          <summary>검색 숨기기</summary>

          <Card className="p-6">
            <DetailedSearch />
          </Card>

          <Card className="p-6">
            <ChannelSearch />
          </Card>
        </details>

        <ProductsTable products={products} offset={newOffset} listPerPage={LIST_PER_PAGE} />

        {LIST_PER_PAGE < totalProducts && (
          <ProductPagination
            productsPerPage={LIST_PER_PAGE}
            offset={newOffset}
            totalProducts={totalProducts}
          />
        )}
      </div>
    </div>
  );
}
