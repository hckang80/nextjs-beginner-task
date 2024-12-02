import useAppStore from '@/app/store';
import { useToast } from '@/hooks/use-toast';
import { AnnouncementContext, toReadableDate } from '@/lib';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BoardContainer({ product }: { product: AnnouncementContext }) {
  const { id, name, price, type, source, createdAt, endedAt } = product;

  const { toast } = useToast();

  const currentFavorites = useAppStore((state) => state.values);
  const hasFavorite = (id: number) => currentFavorites.includes(id);
  const updateFavorite = useAppStore((state) => state.save);
  const saveFavorite = (id: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    updateFavorite(id);

    toast({
      title: getToastTitle(id),
      variant: 'destructive'
    });
  };

  const getToastTitle = (id: number) =>
    hasFavorite(id) ? '관심 공고에서 삭제되었습니다.' : '관심 공고에 추가되었습니다.';

  const getStateColor = (id: number) =>
    hasFavorite(id) ? 'hsl(var(--chart-4))' : 'hsl(var(--input))';

  const router = useRouter();

  const handleRowClick = (row: AnnouncementContext) => {
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
      <td style={{ textAlign: 'left' }}>{name}</td>
      <td>{price}</td>
      <td>{type}</td>
      <td>{source}</td>
      {/* TODO: suppressHydrationWarning 추가 이후 warning은 제거되었으나 날짜가 다르게 찍힘 */}
      <td suppressHydrationWarning>{toReadableDate(createdAt)}</td>{' '}
      <td suppressHydrationWarning>{toReadableDate(endedAt)}</td>
    </tr>
  );
}
