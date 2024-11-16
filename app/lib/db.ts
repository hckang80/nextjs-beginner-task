export interface SelectProduct {
  id: number;
  name: string;
  price: string;
  type: string;
  source: string;
  createAt: Date;
  endAt: Date;
}

export function getKeywordSets(isPublic = true) {
  const data = {
    public: [
      {
        id: 1,
        name: "신규_그룹_공용_2024_11_15",
      },
    ],
    private: [
      {
        id: 2,
        name: "신규_그룹_개인_2024_11_15",
      },
    ],
  };

  return isPublic ? data.public : data.private;
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const items: SelectProduct[] = [
    {
      id: 1,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 2,
      name: "[재공고] 양양양수발전소 Main Air Compressor 설치조건부 구매(S등급/제작)",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 3,
      name: "글로벌 도시 서울로 도약을 위한 도시 마케팅 전략 연구",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 4,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 5,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 6,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 7,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 8,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 9,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
    {
      id: 10,
      name: "가칭 인공지능 직업교육센터 신축공사 폐기물 처리용역",
      price: "0.3억",
      type: "용역",
      source: "충청남도교육청",
      createAt: new Date(),
      endAt: new Date(),
    },
  ];

  return {
    products: items,
    newOffset: null,
    totalProducts: items.length,
  };
}
