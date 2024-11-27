import { z } from 'zod';

export interface KeywordSet {
  id: number;
  name: string;
  isPined: boolean;
  isPrivate: boolean;
}

export const announcementSteps = [
  { label: '입찰 공고', value: '입찰공고' },
  { label: '사전 규격', value: '사전규격' },
  { label: '발주 계획', value: '발주계획' },
  { label: '유찰 공고', value: '유찰공고' },
  { label: '관심 공고', value: '관심공고' }
] as const;
export const announcementStepsLabel = announcementSteps.map(({ label }) => label);
export type AnnouncementSteps = (typeof announcementStepsLabel)[number];

export const announcementTypes = [
  { label: '용역', value: '용역' },
  { label: '물품', value: '물품' },
  { label: '공사', value: '공사' },
  { label: '외자', value: '외자' },
  { label: '기타', value: '기타' }
] as const;
export const announcementTypesLabel = announcementTypes.map(({ label }) => label);
export type AnnouncementTypes = (typeof announcementTypesLabel)[number];

export const announcementPrices = [
  { label: '전체', value: 0 },
  { label: '10억 이상', value: 10 },
  { label: '5억 이상', value: 5 },
  { label: '1억 이상', value: 1 }
];
export const announcementPricesLabel = announcementPrices.map(({ label }) => label);
export type AnnouncementPrices = (typeof announcementPricesLabel)[number];

export const suggestedStates = [
  { label: '검토 중', value: '검토중' },
  { label: '검토 완료 - 제안 가능', value: '제안가능' },
  { label: '검토 완료 - 제안 불가', value: '제안불가' },
  { label: '검토 완료 - 제안 유보', value: '제안유보' },
  { label: '입찰 - 진행', value: '진행' },
  { label: '결과 - 수주', value: '수주' },
  { label: '결과 - 실주', value: '실주' },
  { label: '결과 - 유찰', value: '유찰' }
];
export const suggestedStatesLabel = suggestedStates.map(({ label }) => label);
export type SuggestedStates = (typeof suggestedStatesLabel)[number];

export interface AnnouncementContext {
  id: number;
  name: string;
  price: string;
  type: AnnouncementTypes;
  source: string;
  createdAt: Date;
  endedAt: Date;
}

export interface BidAnnouncementContext {
  products: AnnouncementContext[];
  newOffset: number;
  totalProducts: number;
}

export const keywordSetContextSchema = z.object({
  label: z.string().optional(),
  type: z.string().optional(),
  operation: z.string().optional(),
  text: z.string(),
  tags: z.string().array()
});
export type KeywordSetContext = z.infer<typeof keywordSetContextSchema>;

export const detailedSearchFormSchema = z.object({
  keywordSets: z.record(z.string(), keywordSetContextSchema),
  priceFrom: z.string(),
  priceTo: z.string(),
  announcementDateFrom: z.string(),
  announcementDateTo: z.string(),
  businessType: z.string(),
  ignoreType: z.string(),
  sortType: z.string(),
  conditions: z.string().array()
});
export type DetailedSearchForm = z.infer<typeof detailedSearchFormSchema>;

export const channelContext = [
  { label: '입찰기관', type: 'agency' },
  { label: '대학교', type: 'university' }
];

export interface ChannelItem {
  id: number;
  name: string;
  type: string;
  checked: boolean;
}

export interface Tag {
  id: number;
  text: string;
  bgColor: string;
}

export interface AppliedTag {
  id: number;
  tags: number[];
}
