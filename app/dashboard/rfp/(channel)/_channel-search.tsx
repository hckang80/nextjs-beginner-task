import { useState } from "react";
import { ChannelSearchHead } from "./channel-search-head";
import { ChannelSearchList } from "./channel-search-list";
import { channelContext, ChannelItem } from "@/lib";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const data: ChannelItem[] = [
  { id: 1, name: "BioIN", type: "agency" },
  { id: 2, name: "IBK 시스템", type: "agency" },
  { id: 3, name: "IBK 저축은행", type: "agency" },
  { id: 4, name: "IP-NAVI 사업공고", type: "agency" },
  { id: 5, name: "IP-NAVI 지원사업 공고", type: "agency" },
  { id: 6, name: "ITECH", type: "agency" },
  { id: 7, name: "Kautm", type: "agency" },
  { id: 8, name: "가톨릭대학교", type: "university" },
  { id: 9, name: "건국대학교 글로컬캠퍼스", type: "university" },
  { id: 10, name: "건국대학교 온라인입찰", type: "university" },
  { id: 11, name: "건국대학교 현장입찰", type: "university" },
  { id: 12, name: "경북도립대학교", type: "university" },
  { id: 13, name: "경희대학교", type: "university" },
  { id: 14, name: "고려대학교", type: "university" },
].map((item) => ({ ...item, checked: true }));

export function ChannelSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dataGroups, setDataGroups] = useState(data);

  const filteredData = dataGroups.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: query } = event.currentTarget;
    setSearchQuery(query);
  };

  const handleItemCheckboxChange = (id: number) => {
    const result = (list: ChannelItem[]) =>
      list.map((item) => {
        return item.id === id ? { ...item, checked: !item.checked } : item;
      });

    setDataGroups(result);
  };

  const isAllSelected = dataGroups.every((item) => item.checked);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const result = (list: ChannelItem[]) =>
      list.map((item) => ({ ...item, checked }));

    setDataGroups(result);
  };

  const isGroupSelected = (type: string) =>
    dataGroups
      .filter((item) => item.type === type)
      .every((item) => item.checked);

  const handleSelectGroup =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const result = (list: ChannelItem[]) =>
        list.map((item) => (item.type === type ? { ...item, checked } : item));

      setDataGroups(result);
    };

  const handleSubmit = () => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify(dataGroups, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <>
      <table className="search-table">
        <tbody>
          <ChannelSearchHead
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          {isOpen &&
            channelContext.map(({ label, type }) => (
              <ChannelSearchList
                key={label}
                label={label}
                type={type}
                isGroupSelected={isGroupSelected}
                handleSelectGroup={handleSelectGroup}
                filteredData={filteredData}
                handleItemCheckboxChange={handleItemCheckboxChange}
              />
            ))}
        </tbody>
      </table>
      {isOpen && (
        <div className="text-right">
          <Button onClick={handleSubmit}>
            <Search color="#ffffff" strokeWidth={3} />
            검색하기
          </Button>
        </div>
      )}
    </>
  );
}
