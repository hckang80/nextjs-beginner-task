import type { KeywordSet, AnnouncementContext } from "./types";

export function getKeywordSets() {
  const data: KeywordSet[] = [
    {
      id: 1,
      name: "신규_그룹_공용_2024_11_15",
      isPined: true,
      isPrivate: false,
    },
    {
      id: 2,
      name: "신규_그룹_개인_2024_11_15",
      isPined: false,
      isPrivate: true,
    },
  ];

  return data;
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: AnnouncementContext[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const items: AnnouncementContext[] = [
    {
      id: 1,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 0, 15),
      endedAt: new Date(2025, 5, 15),
    },
    {
      id: 2,
      name: "[재공고] 양양양수발전소 Main Air Compressor 설치조건부 구매(S등급/제작)",
      price: "342.0억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 2, 15),
      endedAt: new Date(2025, 5, 15),
    },
    {
      id: 3,
      name: "글로벌 도시 서울로 도약을 위한 도시 마케팅 전략 연구",
      price: "TBC",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 4, 15),
      endedAt: new Date(2025, 5, 15),
    },
    {
      id: 4,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "469.9억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 1, 15),
      endedAt: new Date(2025, 8, 15),
    },
    {
      id: 5,
      name: "서울 직업교육센터 신축공사 폐기물 처리용역",
      price: "52.0억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 9, 15),
      endedAt: new Date(2025, 6, 15),
    },
    {
      id: 6,
      name: "대전 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 2, 18),
      endedAt: new Date(2027, 11, 15),
    },
    {
      id: 7,
      name: "대구 직업교육센터 신축공사 폐기물 처리용역",
      price: "120.5억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 4, 15),
      endedAt: new Date(2026, 4, 15),
    },
    {
      id: 8,
      name: "부산 직업교육센터 신축공사 폐기물 처리용역",
      price: "300.0억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 3, 30),
      endedAt: new Date(2025, 2, 15),
    },
    {
      id: 9,
      name: "광주 직업교육센터 신축공사 폐기물 처리용역",
      price: "TBC",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 2, 25),
      endedAt: new Date(2025, 5, 15),
    },
    {
      id: 10,
      name: "울산 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 0, 20),
      endedAt: new Date(2025, 5, 15),
    },
    {
      id: 11,
      name: "히든 사업공고",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createdAt: new Date(2024, 1, 15),
      endedAt: new Date(2025, 5, 15),
    },
  ];

  return {
    products: items,
    newOffset: offset,
    totalProducts: items.length,
  };
}
