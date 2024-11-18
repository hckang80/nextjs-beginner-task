import { ChannelItem } from "@/lib";

export function ChannelSearchList({
  label,
  isAllSelected,
  handleSelectAll,
  filteredData,
  handleItemCheckboxChange,
}: {
  label: string;
  isAllSelected: boolean;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredData: ChannelItem[];
  handleItemCheckboxChange: (id: number) => void;
}) {
  return (
    <tr>
      <th>{label}</th>
      <td>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
          입찰기관 전부 보기
        </label>

        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleItemCheckboxChange(item.id)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}
