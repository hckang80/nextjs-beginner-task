"use client";

import { AnnouncementContext, getProducts } from "@/lib";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RfpDetail() {
  const params = useParams<{ id: string }>();

  const [data, setData] = useState<AnnouncementContext | undefined>();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    // TODO: 데이터를 여기서 호출하지 말고 부모에서 넘겨주는 형태로 개선 필요. 데이터 호출 최소화. Context API
    const { products } = await getProducts(0);
    const product = products.find((item) => item.id === +params.id);
    setData(product);
  };

  if (!data) {
    return "Loading...";
  }

  return (
    <div>
      <header>
        <h2>{data.name}</h2>
      </header>
    </div>
  );
}
