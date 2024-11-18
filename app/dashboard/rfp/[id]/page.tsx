"use client";

import { useToast } from "@/hooks/use-toast";
import { AnnouncementContext, getProducts, MY_FAVORITES } from "@/lib";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RfpDetail() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<AnnouncementContext | undefined>();

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // TODO: 데이터를 여기서 호출하지 말고 부모에서 넘겨주는 형태로 개선 필요. 데이터 호출 최소화. Context API
    const { products } = await getProducts(0);
    const product = products.find((item) => item.id === +id);
    setData(product);
  };

  if (!data) {
    return "Loading...";
  }

  // TODO: 아래의 관심공고 등록관련 함수들이 중복이라서 공통 유틸로 분리해보니 반응형으로 동작하지 않음
  const storageKey = MY_FAVORITES;
  const currentFavorites: number[] = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );
  const hasFavorite = (id: number) => currentFavorites.includes(id);

  const saveFavorite = (id: number) => {
    localStorage.setItem(storageKey, JSON.stringify(getSaveResult(id)));

    toast({
      title: getToastTitle(id),
      variant: "destructive",
    });
  };

  const getSaveResult = (id: number) =>
    hasFavorite(id)
      ? currentFavorites.filter((uid) => uid !== id)
      : [...currentFavorites, id];

  const getToastTitle = (id: number) =>
    hasFavorite(id)
      ? "관심 공고에서 삭제되었습니다."
      : "관심 공고에 추가되었습니다.";

  const getStateColor = (id: number) =>
    hasFavorite(id) ? "hsl(var(--chart-4))" : "hsl(var(--input))";

  return (
    <div>
      <header>
        <h2>{data.name}</h2>
        <button onClick={() => saveFavorite(+id)} className="p-[10px]">
          <Star fill={getStateColor(+id)} strokeWidth={0} />
          {hasFavorite(+id) ? "보관중" : "관심 공고 추가"}
        </button>
      </header>
    </div>
  );
}
