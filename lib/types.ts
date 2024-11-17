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
