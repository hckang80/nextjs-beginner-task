"use client";

import { SelectProduct } from "@/lib";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Product } from ".";

interface SortConfig {
  key: keyof SelectProduct | null;
  direction: "ascending" | "descending" | null;
}

export function ProductsTable({
  products,
  offset,
  totalProducts,
  setData,
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
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const handleSort = (key: keyof SelectProduct) => {
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

  return (
    <table className="data-table">
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
      <tbody>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
}
