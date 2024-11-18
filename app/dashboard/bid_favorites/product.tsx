import { SelectProduct, toReadableDate } from "@/lib";
import { useRouter } from "next/navigation";

export function Product({ product }: { product: SelectProduct }) {
  const { id, name, price, type, source, createAt, endAt } = product;

  const router = useRouter();

  const handleRowClick = (row: SelectProduct) => {
    router.push(`/dashboard/rfp/${row.id}`);
  };

  return (
    <tr className="cursor-pointer" onClick={() => handleRowClick(product)}>
      <td>입찰 공고</td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{type}</td>
      <td>{source}</td>
      <td>{toReadableDate(createAt)}</td>
      <td>{toReadableDate(endAt)}</td>
    </tr>
  );
}
