export interface KeywordSet {
  id: number;
  name: string;
  isPined: boolean;
  isPrivate: boolean;
}

export interface SelectProduct {
  id: number;
  name: string;
  price: string;
  type: string;
  source: string;
  createAt: Date;
  endAt: Date;
}

export interface DetailedSearchForm {
  keywordSets: Record<
    string,
    {
      label?: string;
      type?: string;
      operation?: string;
      text: string;
      tags: string[];
    }
  >;
  priceFrom: number;
  priceTo: number;
  announcementDateFrom: string;
  announcementDateTo: string;
  businessType: string;
  ignoreType: "";
  sortType: "";
  condition: {
    [key: string]: boolean;
  };
}

export const channelContext = [
  { label: "입찰기관", type: "agency" },
  { label: "대학교", type: "university" },
];

export interface ChannelItem {
  id: number;
  name: string;
  type: string;
  checked: boolean;
}
