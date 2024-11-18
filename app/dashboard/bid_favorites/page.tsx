"use client";

import { useEffect, useState } from "react";
import { getProducts, MY_FAVORITES, AnnouncementContext } from "@/lib";
import { ProductsTable } from ".";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BidFavorites(props: {
  searchParams: Promise<{ q: string; offset: string }>;
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
    const search = searchParams.q ?? "";
    const offset = searchParams.offset ?? 0;
    setData(await getProducts(search, Number(offset)));
  };

  const [isVisibleMemo, setIsVisibleMemo] = useState(false);

  if (!data) {
    return "Loading...";
  }

  const { products, newOffset } = data;

  const favoriteProducts = products.filter(({ id }) =>
    JSON.parse(localStorage.getItem(MY_FAVORITES) || "[]").includes(id)
  );

  return (
    <>
      <Card className="rounded-[2px] p-[10px]">
        <div className="flex items-center gap-2">
          필터 기능은 미구현
          <Button>태그 필터</Button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isVisibleMemo}
              onChange={() => setIsVisibleMemo(!isVisibleMemo)}
            />
            메모표시
          </label>
        </div>
      </Card>

      <ProductsTable
        isVisibleMemo={isVisibleMemo}
        products={favoriteProducts}
        offset={newOffset ?? 0}
        totalProducts={favoriteProducts.length}
        setData={setData}
      />
    </>
  );
}
