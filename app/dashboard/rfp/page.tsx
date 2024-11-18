"use client";

import { useEffect, useState } from "react";
import { getProducts, SelectProduct } from "@/lib";
import { ProductsTable, DetailedSearch, ChannelSearch } from ".";
import { Card } from "@/components/ui/card";

export default function Rfp(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const [data, setData] = useState<{
    products: SelectProduct[];
    newOffset: number | null;
    totalProducts: number;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const searchParams = await props.searchParams;
    const search = searchParams.q ?? "";
    const offset = searchParams.offset ?? 0;
    setData(await getProducts(search, Number(offset)));
  };

  if (!data) {
    return "Loading...";
  }

  const { products, newOffset, totalProducts } = data;

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>입찰 공고</li>
            <li>사전 규격</li>
            <li>발주 계획</li>
            <li>유찰 공고</li>
          </ul>
        </nav>
        <a
          href="https://www.youtube.com/watch?v=S1XSQbnWTFU"
          rel="noopener noreferrer"
          target="_blank"
        >
          입찰 공고 사용 Tip
        </a>
      </div>

      <div className="grid gap-[15px]">
        <Card className="p-6">
          <DetailedSearch />
        </Card>

        <Card className="p-6">
          <ChannelSearch />
        </Card>

        <div>
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            totalProducts={totalProducts}
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
}
