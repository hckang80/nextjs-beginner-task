"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  MY_FAVORITES,
  AnnouncementContext,
  announcementSteps,
  suggestedStates,
  announcementPrices,
  announcementTypes,
} from "@/lib";
import { ProductsTable } from ".";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/compat/router";
import { Input } from "@/components/ui/input";

export default function BidFavorites(props: {
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

  const [isVisibleMemoContext, setIsVisibleMemoContext] = useState(false);

  if (!data) {
    return "Loading...";
  }

  const { products, newOffset } = data;

  const favoriteProducts = products.filter(({ id }) =>
    JSON.parse(localStorage.getItem(MY_FAVORITES) || "[]").includes(id)
  );

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

            <Button>태그 필터</Button>

            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={isVisibleMemoContext}
                onChange={() => setIsVisibleMemoContext(!isVisibleMemoContext)}
              />
              메모표시
            </label>
          </div>
          <RefreshPage />
        </div>
      </Card>

      <ProductsTable
        isVisibleMemoContext={isVisibleMemoContext}
        products={favoriteProducts}
        offset={newOffset ?? 0}
        totalProducts={favoriteProducts.length}
        setData={setData}
      />
    </>
  );
}

export function RefreshPage() {
  const router = useRouter();

  const handleRefresh = () => {
    // TODO: API 호출이 없어서 동작 여부는 확인 못함
    router?.replace(router.asPath);
  };

  return <Button onClick={handleRefresh}>새로고침</Button>;
}
