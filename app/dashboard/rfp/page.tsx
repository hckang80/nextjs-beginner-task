"use client";

import { useEffect, useState } from "react";
import { getProducts, AnnouncementContext } from "@/lib";
import { ProductsTable, DetailedSearch, ChannelSearch } from ".";
import { Card } from "@/components/ui/card";

export default function Rfp(props: {
  searchParams: Promise<{ offset: string }>;
}) {
  const [data, setData] = useState<{
    products: AnnouncementContext[];
    newOffset: number | null;
    totalProducts: number;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const searchParams = await props.searchParams;
    const offset = searchParams.offset ?? 0;
    setData(await getProducts(Number(offset)));
  };

  if (!data) {
    return "Loading..."; // TODO: 새로고침시에도 로딩이 안나오고 데이터를 좀 더 빠르게 가져올 수 없을까? getServerSideProps를 이용해보자
  }

  const { products, newOffset, totalProducts } = data;

  return (
    <div>
      <header className="mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">입찰 공고</h2>
        <a
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
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            totalProducts={totalProducts}
          />
        </div>
      </div>
    </div>
  );
}
