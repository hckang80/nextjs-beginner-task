import type { AnnouncementContext } from './types';

export async function getProducts(offset: number): Promise<{
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
      name: '궤도다짐장비(MTT) 구매(재공고)',
      price: '301.7억',
      type: '물품',
      source: '국가철도공단',
      createdAt: new Date(2024, 10, 13),
      endedAt: new Date(2024, 11, 5)
    },
    {
      id: 2,
      name: 'EBS 방송 및 교육 인터넷서비스 통합 운영 사업',
      price: '469.9억',
      type: '용역',
      source: '한국교육방송공사',
      createdAt: new Date(2024, 2, 15),
      endedAt: new Date(2025, 5, 15)
    },
    {
      id: 3,
      name: '주택건설공사 감리자(전기) 모집공고(서초신동아)',
      price: '공고문 참조',
      type: '용역',
      source: '서울특별시 서초구',
      createdAt: new Date(2024, 4, 15),
      endedAt: new Date(2025, 5, 15)
    },
    {
      id: 4,
      name: 'GIS(362KV,6300A,63KA) 23식 - 신포항 S/S (신설)',
      price: '401.6억',
      type: '물품',
      source: '상생조달처',
      createdAt: new Date(2024, 1, 15),
      endedAt: new Date(2025, 8, 15)
    },
    {
      id: 5,
      name: '호남고속철도 광주송정역사 증축공사(재공고)',
      price: '367.6억',
      type: '공사',
      source: '국가철도공단',
      createdAt: new Date(2024, 9, 15),
      endedAt: new Date(2025, 6, 15)
    },
    {
      id: 6,
      name: '전남대 캠퍼스혁신파크 산학연 혁신허브 건설공사',
      price: '346.0억',
      type: '용역',
      source: '한국토지주택공사',
      createdAt: new Date(2024, 2, 18),
      endedAt: new Date(2027, 11, 15)
    },
    {
      id: 7,
      name: '다산 자연재해위험개선지구 정비사업 토목건축기계공사',
      price: '342.0억',
      type: '용역',
      source: '한국농어촌공사 경북지역본부 고령지사',
      createdAt: new Date(2024, 4, 15),
      endedAt: new Date(2026, 4, 15)
    },
    {
      id: 8,
      name: '궤도다짐장비(MTT) 구매(재공고)',
      price: '331.9억',
      type: '물품',
      source: '국가철도공단',
      createdAt: new Date(2024, 3, 30),
      endedAt: new Date(2025, 2, 15)
    },
    {
      id: 9,
      name: '국립공원 다목적 헬리콥터 제작 및 구매',
      price: 'TBC',
      type: '물품',
      source: '국립공원공단',
      createdAt: new Date(2024, 2, 25),
      endedAt: new Date(2025, 5, 15)
    },
    {
      id: 10,
      name: '울산 직업교육센터 신축공사 폐기물 처리용역',
      price: '0.3억',
      type: '용역',
      source: '충청남도교육청',
      createdAt: new Date(2024, 0, 20),
      endedAt: new Date(2025, 5, 15)
    },
    {
      id: 11,
      name: '거창 첨단일반산업단지 조성',
      price: '0.3억',
      type: '용역',
      source: '경상남도 거창군',
      createdAt: new Date(2024, 1, 15),
      endedAt: new Date(2025, 5, 15)
    }
  ];

  return {
    products: items,
    newOffset: offset,
    totalProducts: items.length
  };
}
