'use client';

import { useEffect, useState } from 'react';
import {
  announcementSteps,
  suggestedStates,
  announcementPrices,
  announcementTypes,
  Tag,
  AppliedTag,
  BidAnnouncementContext,
  MY_FAVORITES,
  fetcher
} from '@/lib';
import { ProductsTable } from '.';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/compat/router';
import { Input } from '@/components/ui/input';
import useSWR from 'swr';
import { useFavoriteList } from './context/UseFavoriteListContext';
import { useToast } from '@/hooks/use-toast';

export default function BidFavorites() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const offset = Number(searchParams?.get('offset'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);

  const { toast } = useToast();

  const [isVisibleMemoContext, setIsVisibleMemoContext] = useState(false);

  const { setTags, setAppliedTags, setBidAnnouncementsContext } = useFavoriteList();

  const { data, error } = useSWR<[BidAnnouncementContext, Tag[], AppliedTag[]], unknown, string[]>(
    ['/bidAnnouncementContext.json', '/tags.json', '/appliedTags.json'],
    ([url1, url2, url3]) => Promise.all([fetcher(url1), fetcher(url2), fetcher(url3)])
  );

  useEffect(() => {
    if (data) {
      const [bidAnnouncementsContext, myTags, appliedTags] = data;
      const favoriteProducts = bidAnnouncementsContext.products.filter(({ id }) =>
        JSON.parse(localStorage.getItem(MY_FAVORITES) || '[]').includes(id)
      );

      setBidAnnouncementsContext({
        products: favoriteProducts,
        newOffset: offset,
        totalProducts: favoriteProducts.length
      });
      setTags(myTags);
      setAppliedTags(appliedTags);
    }
  }, [data, setBidAnnouncementsContext, setTags, setAppliedTags, offset]);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">관심 공고</h2>
      </header>

      <Card className="rounded-[2px] p-[10px]">
        <div className="flex justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <select>
              <option value="">공고 단계</option>
              {announcementSteps.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Input placeholder="공고명 검색" className="w-[150px]" />
            <Input placeholder="기관 검색" className="w-[150px]" />
            <select>
              <option value="">구분</option>
              {announcementTypes.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select>
              <option value="">금액</option>
              {announcementPrices.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select>
              <option value="">제안 선택</option>
              {suggestedStates.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <Button
              onClick={() => {
                toast({
                  description:
                    '필터 기능이라서 구현 생략. 메모셀에는 태그추가 기능이 구현되어 있음',
                  variant: 'destructive'
                });
              }}
            >
              태그 필터
            </Button>

            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={isVisibleMemoContext}
                onChange={() => setIsVisibleMemoContext(!isVisibleMemoContext)}
              />
              메모표시
            </label>
          </div>
          <RefreshPage />
        </div>
      </Card>

      <ProductsTable
        isVisibleMemoContext={isVisibleMemoContext}
        setData={setBidAnnouncementsContext}
      />
    </>
  );
}

export function RefreshPage() {
  const router = useRouter();

  const handleRefresh = () => {
    router?.replace(router.asPath);
  };

  return <Button onClick={handleRefresh}>새로고침</Button>;
}
