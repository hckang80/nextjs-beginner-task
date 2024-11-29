import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

export function ChannelHead({
  isAllSelected,
  handleSelectAll,
  searchQuery,
  handleSearch,
  isOpen,
  setIsOpen
}: {
  isAllSelected: boolean;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  handleSearch: (event: React.FormEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <tr>
      <th>채널</th>
      <td>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Input
              className="w-[300px]"
              type="text"
              placeholder="채널을 검색해서 추가해보세요"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              onClick={() => setIsOpen(true)}
            />
            채널 전부 보기
          </label>

          <Button
            type="button"
            variant="secondary"
            className="ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            채널 목록 {!isOpen ? '열기' : '접기'}
          </Button>
        </div>
      </td>
    </tr>
  );
}
