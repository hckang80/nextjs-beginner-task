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
