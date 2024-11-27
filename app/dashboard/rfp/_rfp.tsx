'use client';

import { useEffect, useState } from 'react';
import { KeywordSet, BidAnnouncementContext, fetcher } from '@/lib';
import { ProductsTable, DetailedSearch, ChannelSearch } from '.';
import { Card } from '@/components/ui/card';
import { useBidAnnouncement } from './context/BidAnnouncementContext';
import useSWR from 'swr';

export default function Rfp({
  initialData
}: {
  initialData: { data1: BidAnnouncementContext; data2: KeywordSet[] };
}) {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const offset = Number(searchParams?.get('offset'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);

  const { setBidAnnouncementsContext, setKeywordSetsContext } = useBidAnnouncement();

  const { data, error } = useSWR(
    ['/bidAnnouncementContext.json', '/keywordSets.json'],
    ([url1, url2]) =>
      Promise.all([fetcher<BidAnnouncementContext>(url1), fetcher<KeywordSet[]>(url2)]),
    {
      fallbackData: [initialData.data1, initialData.data2]
    }
  );

  useEffect(() => {
    if (data) {
      const [bidAnnouncementsContext, keywordSetsContext] = data;
      setBidAnnouncementsContext({ ...bidAnnouncementsContext, newOffset: offset });
      setKeywordSetsContext(keywordSetsContext);
    }
  }, [data, setBidAnnouncementsContext, setKeywordSetsContext, offset]);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

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

        <div>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}
