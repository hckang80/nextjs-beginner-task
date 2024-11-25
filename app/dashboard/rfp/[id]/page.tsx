'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AnnouncementContext, getProducts, MY_FAVORITES } from '@/lib';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { NoteTextarea } from './note-textarea';

export default function RfpDetail() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<AnnouncementContext | undefined>();

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // TODO: 데이터를 여기서 호출하지 말고 부모에서 넘겨주는 형태로 개선 필요. 데이터 호출 최소화. Context API
    const { products } = await getProducts(0);
    const product = products.find((item) => item.id === +id);
    setData(product);
  };

  if (!data) {
    return 'Loading...';
  }

  // TODO: 아래의 관심공고 등록관련 함수들이 중복이라서 공통 유틸로 분리해보니 반응형으로 동작하지 않음
  const storageKey = MY_FAVORITES;
  const currentFavorites: number[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const hasFavorite = (id: number) => currentFavorites.includes(id);

  const saveFavorite = (id: number) => {
    localStorage.setItem(storageKey, JSON.stringify(getSaveResult(id)));

    toast({
      title: getToastTitle(id),
      variant: 'destructive'
    });
  };

  const getSaveResult = (id: number) =>
    hasFavorite(id) ? currentFavorites.filter((uid) => uid !== id) : [...currentFavorites, id];

  const getToastTitle = (id: number) =>
    hasFavorite(id) ? '관심 공고에서 삭제되었습니다.' : '관심 공고에 추가되었습니다.';

  const getStateColor = (id: number) =>
    hasFavorite(id) ? 'hsl(var(--chart-4))' : 'hsl(var(--border))';

  return (
    <div>
      <header className="flex items-center gap-[8px] mb-[15px]">
        <h2 className="font-bold text-[18px]">{data.name}</h2>
        <Button onClick={() => saveFavorite(+id)} className="flex items-center gap-[4px] p-[10px]">
          <Star fill={getStateColor(+id)} strokeWidth={0} />
          <span style={{ color: getStateColor(+id) }}>
            {hasFavorite(+id) ? '보관중' : '관심 공고 추가'}
          </span>
        </Button>
      </header>

      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[20px]">
          <Card className="grow basis-full">
            <CardHeader>
              <CardTitle>자격 분석 노트</CardTitle>
            </CardHeader>
            <CardContent>
              <NoteTextarea />
            </CardContent>
          </Card>
          <Card className="grow basis-full">
            <CardHeader>
              <CardTitle>프로젝트 정보</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-[20px]">
          <Card className="grow basis-1/3 lg:basis-full">
            <CardHeader>
              <CardTitle>공동수급 ・ 지역제한 ・ 선정방식</CardTitle>
            </CardHeader>
          </Card>
          <Card className="grow basis-1/3 lg:basis-full">
            <CardHeader>
              <CardTitle>업종제한</CardTitle>
            </CardHeader>
          </Card>
          <Card className="grow shrink-0 lg:shrink basis-full">
            <CardHeader>
              <CardTitle>직접생산 분석 [제한 없음]</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>담당자 정보</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>입찰참가자격</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>첨부파일</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
