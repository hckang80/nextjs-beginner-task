'use client';

import { AnnouncementContext, BidAnnouncementContext, fetcher } from '@/lib';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Product } from '.';
import { ProductPagination } from '../product-pagination';
import useAppStore from '@/app/store';
import { useLayoutData } from './LayoutContextProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface SortConfig {
  key: keyof AnnouncementContext | null;
  direction: 'ascending' | 'descending' | null;
}

export function ProductsTable({ isVisibleMemoContext }: { isVisibleMemoContext: boolean }) {
  const {
    data: [data]
  } = useLayoutData();

  const { data: bidAnnouncementContext } = useQuery({
    queryKey: ['bidAnnouncementContext'],
    queryFn: () => fetcher<BidAnnouncementContext>('/bidAnnouncementContext.json'),
    initialData: data
  });

  const queryClient = useQueryClient();

  const {
    products,
    newOffset: offset,
    totalProducts
  } = bidAnnouncementContext || { products: [], newOffset: 0, totalProducts: 0 };

  const LIST_PER_PAGE = 10;

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

  const tableRef = useRef<HTMLTableElement | null>(null);

  const focusDataTable = () => {
    tableRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    const isPaginationTouch = new URLSearchParams(location.search).has('offset');
    if (!isPaginationTouch) return;
    focusDataTable();
  }, [offset]);

  const updateFavorite = useAppStore((state) => state.save);

  const deleteFavorite = (id: number) => {
    updateFavorite(id);

    queryClient.setQueryData(['bidAnnouncementContext'], () => {
      return {
        newOffset: offset,
        totalProducts,
        products: products.filter((item) => item.id !== id)
      };
    });
  };

  return (
    <>
      <table className="data-table" ref={tableRef}>
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
        {products.slice(offset, offset + LIST_PER_PAGE).map((product) => (
          <Product
            key={product.id}
            isVisibleMemoContext={isVisibleMemoContext}
            product={product}
            deleteFavorite={deleteFavorite}
          />
        ))}
      </table>

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
