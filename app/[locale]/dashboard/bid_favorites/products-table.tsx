'use client';

import { AnnouncementContext, BidAnnouncementContext } from '@/lib';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Product } from '.';
import useAppStore from '@/app/store';
import { useQueryClient } from '@tanstack/react-query';

interface SortConfig {
  key: keyof AnnouncementContext | null;
  direction: 'ascending' | 'descending' | null;
}

export function ProductsTable({
  isVisibleMemoContext,
  bidAnnouncementContext,
  offset,
  listPerPage
}: {
  isVisibleMemoContext: boolean;
  bidAnnouncementContext: BidAnnouncementContext;
  offset: number;
  listPerPage: number;
}) {
  const queryClient = useQueryClient();

  const { products, totalProducts } = bidAnnouncementContext;

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null
  });

  const handleSort = (key: keyof AnnouncementContext) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';

    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    queryClient.setQueryData(['bidAnnouncementContext'], () => {
      return {
        newOffset: offset,
        totalProducts,
        products: sortedData
      };
    });

    setSortConfig({ key, direction });
  };

  const updateFavorite = useAppStore((state) => state.save);

  const deleteFavorite = (id: number) => {
    updateFavorite(id);

    queryClient.setQueryData<BidAnnouncementContext>(['bidAnnouncementContext'], (oldData) => {
      if (!oldData) return;

      return {
        ...oldData,
        products: products.filter((item) => item.id !== id)
      };
    });
  };

  return (
    <>
      <table className="data-table">
        <colgroup>
          <col />
          <col />
          <col className="w-[260px]" />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>공고 단계</th>
            <th>구분</th>
            <th>공고명</th>
            <th>
              <button
                className="inline-flex items-center gap-[4px]"
                onClick={() => handleSort('price')}
              >
                금액(원)
                <ArrowUpDown size={16} />
              </button>
            </th>
            <th>공고기관</th>
            <th>
              <button
                className="inline-flex items-center gap-[4px]"
                onClick={() => handleSort('createdAt')}
              >
                게시일
                <ArrowUpDown size={16} />
              </button>
            </th>
            <th>
              <button
                className="inline-flex items-center gap-[4px]"
                onClick={() => handleSort('endedAt')}
              >
                마감일
                <ArrowUpDown size={16} />
              </button>
            </th>
            <th>삭제</th>
          </tr>
        </thead>
        {products.slice(offset, offset + listPerPage).map((product) => (
          <Product
            key={product.id}
            isVisibleMemoContext={isVisibleMemoContext}
            product={product}
            deleteFavorite={deleteFavorite}
          />
        ))}
      </table>
    </>
  );
}
