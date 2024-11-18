"use client";

import { AnnouncementContext } from "@/lib";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Product } from ".";
import { ProductPagination } from "../product-pagination";

interface SortConfig {
  key: keyof AnnouncementContext | null;
  direction: "ascending" | "descending" | null;
}

export function ProductsTable({
  isVisibleMemo,
  products,
  offset,
  totalProducts,
  setData,
}: {
  isVisibleMemo: boolean;
  products: AnnouncementContext[];
  offset: number;
  totalProducts: number;
  setData: Dispatch<
    SetStateAction<{
      products: AnnouncementContext[];
      newOffset: number | null;
      totalProducts: number;
    } | null>
  >;
}) {
  const PRODUCTS_PER_PAGE = 10;

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const handleSort = (key: keyof AnnouncementContext) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData({
      newOffset: offset,
      totalProducts,
      products: sortedData,
    });
    setSortConfig({ key, direction });
  };

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
            <th>
              #
              <button onClick={() => handleSort("id")}>
                <ArrowUpDown />
              </button>
            </th>
            <th>
              공고명
              <button onClick={() => handleSort("name")}>
                <ArrowUpDown />
              </button>
            </th>
            <th>금액(원)</th>
            <th>구분</th>
            <th>공고기관</th>
            <th>게시일</th>
            <th>마김일</th>
          </tr>
        </thead>
        {products.slice(offset, offset + PRODUCTS_PER_PAGE).map((product) => (
          <Product
            key={product.id}
            isVisibleMemo={isVisibleMemo}
            product={product}
          />
        ))}
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
