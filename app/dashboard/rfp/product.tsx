import { SelectProduct } from "@/lib";
import { Star } from "lucide-react";

export function Product({
  product: { id, name, price, type, source, createAt, endAt },
}: {
  product: SelectProduct;
}) {
  const storageKey = "myFavorites";
  const currentFavorites: number[] = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );
  const hasFavorite = (id: number) => currentFavorites.includes(id);

  const saveFavorite =
    (id: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      const result = hasFavorite(id)
        ? currentFavorites.filter((uid) => uid !== id)
        : [...currentFavorites, id];

      localStorage.setItem(storageKey, JSON.stringify(result));
    };

  const getStateColor = (id: number) =>
    hasFavorite(id) ? "hsl(var(--chart-4))" : "hsl(var(--input))";

  return (
    <tr>
      <td>
        <button onClick={saveFavorite(id)}>
          <Star fill={getStateColor(id)} strokeWidth={0} />
        </button>
      </td>
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
