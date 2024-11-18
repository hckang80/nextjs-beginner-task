import { ChannelItem, cn } from "@/lib";

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
  const bgColor: Record<string, string> = {
    agency: "bg-violet-400",
    university: "bg-red-300",
  };

  return (
    <>
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
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <ul className="grid gap-[5px] grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] auto-rows-fr">
            {filteredData
              .filter((item) => item.type === type)
              .map((item) => (
                <li key={item.id} className="contents">
                  <label
                    className={cn(
                      "flex items-center gap-2 rounded-[8px] text-center h-[35px] px-[10px] text-[14px] leading-[1.2]",
                      item.checked
                        ? `${bgColor[type]} text-white`
                        : "bg-gray-200"
                    )}
                  >
                    <input
                      className="absolute opacity-0"
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleItemCheckboxChange(item.id)}
                    />
                    <span className="grow align-item">{item.name}</span>
                  </label>
                </li>
              ))}
          </ul>
        </td>
      </tr>
    </>
  );
}
