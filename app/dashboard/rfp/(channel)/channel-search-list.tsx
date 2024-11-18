import { ChannelItem } from "@/lib";

export function ChannelSearchList({
  label,
  type,
  isGroupSelected,
  handleSelectGroup,
  filteredData,
  handleItemCheckboxChange,
}: {
  label: string;
  type: string;
  isGroupSelected: (type: string) => boolean;
  handleSelectGroup: (
    type: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            checked={isGroupSelected(type)}
            onChange={handleSelectGroup(type)}
          />
          {`${label} 전부 보기`}
        </label>

        <ul>
          {filteredData
            .filter((item) => item.type === type)
            .map((item) => (
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
