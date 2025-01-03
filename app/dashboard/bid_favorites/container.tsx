'use client';

import { useState } from 'react';
import {
  announcementSteps,
  suggestedStates,
  announcementPrices,
  announcementTypes,
  BidAnnouncementContext,
  fetcher
} from '@/lib';
import { ProductsTable } from '.';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useAppStore from '@/app/store';
import { useLayoutData } from './LayoutContextProvider';
import { useQuery } from '@tanstack/react-query';
import { ProductPagination } from '../product-pagination';

export default function Container({ offset }: { offset: number }) {
  const [isVisibleMemoContext, setIsVisibleMemoContext] = useState(true);

  const {
    data: [data]
  } = useLayoutData();

  const LIST_PER_PAGE = 5;

  const currentFavorites = useAppStore((state) => state.values);
  const totalProducts = currentFavorites.length;

  const { data: bidAnnouncementContext } = useQuery({
    queryKey: ['bidAnnouncementContext'],
    queryFn: async () => {
      const resp = await fetcher<BidAnnouncementContext>('/bidAnnouncementContext.json');
      const favoriteProducts = resp.products.filter(({ id }) => currentFavorites.includes(id));

      return {
        products: favoriteProducts,
        newOffset: offset,
        totalProducts
      };
    },
    initialData: {
      products: data.products.filter(({ id }) => currentFavorites.includes(id)),
      newOffset: offset,
      totalProducts: data.products.filter(({ id }) => currentFavorites.includes(id)).length
    }
  });

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

            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={isVisibleMemoContext}
                onChange={() => setIsVisibleMemoContext(!isVisibleMemoContext)}
              />
              메모표시
            </label>
          </div>
        </div>
      </Card>

      <ProductsTable
        isVisibleMemoContext={isVisibleMemoContext}
        bidAnnouncementContext={bidAnnouncementContext}
        offset={offset}
        listPerPage={LIST_PER_PAGE}
      />

      {LIST_PER_PAGE < totalProducts && (
        <ProductPagination
          productsPerPage={LIST_PER_PAGE}
          offset={offset}
          totalProducts={totalProducts}
        />
      )}
    </>
  );
}
