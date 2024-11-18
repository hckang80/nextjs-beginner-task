"use client";

import { useEffect, useState } from "react";
import { getProducts, SelectProduct } from "@/lib";
import { ProductsTable } from ".";

export default function BidFavorites(props: {
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

  const favoriteProducts = products.filter(({ id }) =>
    JSON.parse(localStorage.getItem("myFavorites") || "[]").includes(id)
  );

  return (
    <ProductsTable
      products={favoriteProducts}
      offset={newOffset ?? 0}
      totalProducts={favoriteProducts.length}
      setData={setData}
    />
  );
}
