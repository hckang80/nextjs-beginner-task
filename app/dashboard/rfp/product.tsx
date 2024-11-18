import { useToast } from "@/hooks/use-toast";
import { SelectProduct } from "@/lib";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export function Product({ product }: { product: SelectProduct }) {
  const { id, name, price, type, source, createAt, endAt } = product;

  const { toast } = useToast();

  const storageKey = "myFavorites";
  const currentFavorites: number[] = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );
  const hasFavorite = (id: number) => currentFavorites.includes(id);

  const saveFavorite =
    (id: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

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
      ? "프로젝트(My Projects)에서 삭제되었습니다."
      : "관심 공고에 추가되었습니다.";

  const getStateColor = (id: number) =>
    hasFavorite(id) ? "hsl(var(--chart-4))" : "hsl(var(--input))";

  const router = useRouter();

  const handleRowClick = (row: SelectProduct) => {
    router.push(`/dashboard/rfp/${row.id}`);
  };

  return (
    <tr className="cursor-pointer" onClick={() => handleRowClick(product)}>
      <td>
        <button onClick={saveFavorite(id)} className="p-[10px]">
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
