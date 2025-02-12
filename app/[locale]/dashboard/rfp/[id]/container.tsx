'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import React from 'react';
import { NoteTextarea } from './note-textarea';
import useAppStore from '@/app/store';
import { useLayoutData } from '../LayoutContextProvider';

export default function Container({ id }: { id: number }) {
  const { toast } = useToast();

  const {
    data: [{ products }]
  } = useLayoutData();

  const product = products.find((item) => item.id === +id);

  const currentFavorites = useAppStore((state) => state.values);
  const hasFavorite = (id: number) => currentFavorites.includes(id);
  const updateFavorite = useAppStore((state) => state.save);
  const saveFavorite = (id: number) => {
    updateFavorite(id);

    toast({
      title: getToastTitle(id),
      variant: 'destructive'
    });
  };

  // TODO: 중복 함수. 분리 필요
  const getToastTitle = (id: number) =>
    hasFavorite(id) ? '관심 공고에서 삭제되었습니다.' : '관심 공고에 추가되었습니다.';

  const getStateColor = (id: number) =>
    hasFavorite(id) ? 'hsl(var(--chart-4))' : 'hsl(var(--border))';

  if (!product) {
    return 'Loading...';
  }

  return (
    <div>
      <header className="flex items-center gap-[8px] mb-[15px]">
        <h2 className="font-bold text-[18px]">{product.name}</h2>
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
              <NoteTextarea id={+id} />
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
