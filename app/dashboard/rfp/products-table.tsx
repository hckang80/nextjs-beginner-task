'use client';

import { useEffect, useRef } from 'react';
import { Product } from '.';
import { ProductPagination } from '../product-pagination';
import { useBidAnnouncement } from './context/BidAnnouncementContext';

export function ProductsTable() {
  const PRODUCTS_PER_PAGE = 5;

  const tableRef = useRef<HTMLTableElement | null>(null);

  const focusDataTable = () => {
    tableRef?.current?.scrollIntoView();
  };

  const { bidAnnouncementsContext } = useBidAnnouncement();

  const {
    products,
    newOffset: offset,
    totalProducts
  } = bidAnnouncementsContext || { products: [], newOffset: 0, totalProducts: 0 };

  useEffect(() => {
    const isPaginationTouch = new URLSearchParams(location.search).has('offset');
    if (!isPaginationTouch) return;
    focusDataTable();
  }, [offset]);

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
            <th>관심공고</th>
            <th>#</th>
            <th>공고명</th>
            <th>금액(원)</th>
            <th>구분</th>
            <th>공고기관</th>
            <th>게시일</th>
            <th>마감일</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(offset, offset + PRODUCTS_PER_PAGE).map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>

      {PRODUCTS_PER_PAGE < totalProducts && (
        <ProductPagination
          productsPerPage={PRODUCTS_PER_PAGE}
          offset={offset}
          totalProducts={totalProducts}
        />
      )}
    </>
  );
}
