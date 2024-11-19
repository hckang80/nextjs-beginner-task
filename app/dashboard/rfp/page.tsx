'use client';

import { useEffect, useMemo } from 'react';
import { KeywordSet, BidAnnouncementContext } from '@/lib';
import { ProductsTable, DetailedSearch, ChannelSearch } from '.';
import { Card } from '@/components/ui/card';
import { useBidAnnouncement } from './context/BidAnnouncementContext';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Rfp() {
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const offset = Number(searchParams.get('offset') ?? 0);

  const { setBidAnnouncementsContext, setKeywordSetsContext } = useBidAnnouncement();

  const { data: bidAnnouncementsContext } = useSWR<BidAnnouncementContext>(
    '/bidAnnouncementContext.json',
    fetcher
  );

  const { data: keywordSetsContext } = useSWR<KeywordSet[]>('/keywordSets.json', fetcher);

  useEffect(() => {
    if (bidAnnouncementsContext) {
      setBidAnnouncementsContext({
        ...bidAnnouncementsContext,
        newOffset: offset
      });
    }
  }, [bidAnnouncementsContext, setBidAnnouncementsContext, offset]);

  useEffect(() => {
    if (keywordSetsContext) {
      setKeywordSetsContext(keywordSetsContext);
    }
  }, [keywordSetsContext, setKeywordSetsContext]);

  if (!bidAnnouncementsContext || !keywordSetsContext) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">입찰 공고</h2>
        <a
          className="underline"
          href="https://www.youtube.com/watch?v=S1XSQbnWTFU"
          rel="noopener noreferrer"
          target="_blank"
        >
          입찰 공고 사용 Tip
        </a>
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
