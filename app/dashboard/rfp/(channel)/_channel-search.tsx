import { useState } from "react";
import { ChannelSearchHead } from "./channel-search-head";
import { ChannelSearchList } from "./channel-search-list";
import { ChannelItem } from "@/lib";

const sampleData: ChannelItem[] = [
  { id: 1, name: "BioIN" },
  { id: 2, name: "IBK 시스템" },
  { id: 3, name: "IBK 저축은행" },
  { id: 4, name: "IP-NAVI 사업공고" },
  { id: 5, name: "IP-NAVI 지원사업 공고" },
  { id: 6, name: "ITECH" },
  { id: 7, name: "Kautm" },
].map((item) => ({ ...item, checked: true }));

export function ChannelSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: query } = event.currentTarget;
    setSearchQuery(query);

    const filtered = sampleData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleItemCheckboxChange = (id: number) => {
    setFilteredData((list) =>
      list.map((item) => {
        return item.id === id ? { ...item, checked: !item.checked } : item;
      })
    );
  };

  const isAllSelected =
    filteredData.length > 0 && filteredData.every((item) => item.checked);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFilteredData((list) => list.map((item) => ({ ...item, checked })));
  };

  return (
    <table className="search-table">
      <tbody>
        <ChannelSearchHead
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />

        <ChannelSearchList
          isAllSelected={isAllSelected}
          handleSelectAll={handleSelectAll}
          filteredData={filteredData}
          handleItemCheckboxChange={handleItemCheckboxChange}
        />
      </tbody>
    </table>
  );
}
