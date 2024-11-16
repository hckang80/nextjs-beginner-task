import { SelectProduct } from "@/app/lib/db";

export function Product({
  product: { id, name, price, type, source, createAt, endAt },
}: {
  product: SelectProduct;
}) {
  return (
    <tr>
      <td>TODO: 관심 공고</td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{type}</td>
      <td>{source}</td>
      <td>{createAt.toISOString()}</td>
      <td>{endAt.toISOString()}</td>
    </tr>
  );
}
