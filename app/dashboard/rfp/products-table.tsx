"use client";

import { SelectProduct } from "@/lib";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Product, ProductPagination } from ".";

export function ProductsTable({
  products,
  offset,
  totalProducts,
}: {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
  setData: Dispatch<
    SetStateAction<{
      products: SelectProduct[];
      newOffset: number | null;
      totalProducts: number;
    } | null>
  >;
}) {
  const PRODUCTS_PER_PAGE = 5;

  const tableRef = useRef<HTMLTableElement | null>(null);

  const focusDataTable = () => {
    tableRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    const isPaginationTouch = new URLSearchParams(location.search).has(
      "offset"
    );
    if (!isPaginationTouch) return;
    focusDataTable();
  }, [offset]);

  return (
    <>
      <table className="data-table" ref={tableRef}>
        <thead>
          <tr>
            <th>관심공고</th>
            <th>#</th>
            <th>공고명</th>
            <th>금액(원)</th>
            <th>구분</th>
            <th>공고기관</th>
            <th>게시일</th>
            <th>마김일</th>
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
