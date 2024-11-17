"use client";
import { Product } from ".";
import { SelectProduct } from "@/lib";

export function ProductsTable({
  products,
}: {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>관심공고</th>
          <th>#</th>
          <th>공고명</th>
          <th>금액(원)</th>
          <th>구분</th>
          <th>공고기관</th>
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
