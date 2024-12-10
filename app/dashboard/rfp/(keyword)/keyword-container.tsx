'use client';

import { Plus, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast, useToast } from '@/hooks/use-toast';
import {
  DetailedSearchForm,
  detailedSearchFormSchema,
  extractNumbers,
  generatedId,
  KeywordSet,
  toReadableDate,
  toReadableNumber
} from '@/lib';
import { KeywordSetItem, ToggleController } from '..';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import ConditionsRow from './conditions-row';
import BusinessPriceRow from './business-price-row';
import KeywordSetItemRow from './keyword-set-item-row';
import KeywordSetHeadRow from './keyword-set-head-row';

const DEFAULT_ANNOUNCEMENT_DEADLINE = 500_000_000;

const DEFAULT_ANNOUNCEMENT_DAY_TYPE = 'inAWeek';

const dateRange = [
  {
    label: '하루 전',
    value: 'inADay',
    calculatedDate() {
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - 1);
      return toReadableDate(date);
    }
  },
  {
    label: '일주일 전',
    value: 'inAWeek',
    calculatedDate() {
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - 7);
      return toReadableDate(date);
    }
  },
  {
    label: '한 달 전',
    value: 'inAMonth',
    calculatedDate() {
      const today = new Date();
      const date = new Date(today);
      date.setMonth(today.getMonth() - 1);
      return toReadableDate(date);
    }
  },
  {
    label: '일 년 전',
    value: 'inAYear',
    calculatedDate() {
      const today = new Date();
      const date = new Date(today);
      date.setFullYear(today.getFullYear() - 1);
      return toReadableDate(date);
    }
  },
  {
    label: '전체 조회',
    value: 'all',
    calculatedDate() {
      return toReadableDate(new Date(2020, 0, 1));
    }
  },
  {
    label: '자유 입력',
    value: 'etc',
    calculatedDate() {
      return '';
    }
  }
];

export function SettingButton({
  data: isPrivate,
  handler,
  keywordSets
}: {
  data: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
  keywordSets: KeywordSet[];
}) {
  const queryClient = useQueryClient();

  const pinKeywordSetItem = (id: number) => {
    queryClient.setQueryData(['keywordSets'], (keywordSets: KeywordSet[]) => {
      return keywordSets.map((item) =>
        item.id === id ? { ...item, isPined: !item.isPined } : item
      );
    });
  };

  const deleteKeywordSetItem = (id: number) => {
    queryClient.setQueryData(['keywordSets'], (keywordSets: KeywordSet[]) => {
      return keywordSets.filter((item) => item.id !== id);
    });
    toast({
      title: '그룹이 삭제되었습니다.'
    });
  };

  const changeKeywordSetName = (id: number) => (event: React.FormEvent<HTMLInputElement>) => {
    queryClient.setQueryData(['keywordSets'], (keywordSets: KeywordSet[]) => {
      return keywordSets.map((item) =>
        item.id === id ? { ...item, name: event.currentTarget.value } : item
      );
    });
  };

  const { toast } = useToast();

  const getKeywordSetName = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateString = `${year}_${month}_${day}`;

    return `신규_그룹_${isPrivate ? '개인' : '공용'}_${dateString}`;
  };

  const addKeywordSet = () => {
    queryClient.setQueryData(['keywordSets'], (keywordSets: KeywordSet[]) => {
      return [
        ...keywordSets,
        {
          id: generatedId(keywordSets),
          name: getKeywordSetName(),
          isPined: false,
          isPrivate
        }
      ];
    });
  };

  const postKeywordSet = () => {
    toast({
      title: '검색 그룹이 설정되었습니다.',
      description: (
        <pre>
          <code>{JSON.stringify(keywordSets, null, 2)}</code>
        </pre>
      )
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>키워드세트 관리</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <div className="flex items-center gap-4 justify-between mb-4">
            <ToggleController data={isPrivate} handler={handler} />
            선택하신 상단의 그룹이 기본 검색 조건으로 설정됩니다
          </div>
          <ul className="flex flex-col gap-2 mb-4">
            {keywordSets
              ?.filter((item) => item.isPrivate === isPrivate)
              .map((item) => (
                <KeywordSetItem
                  key={item.id}
                  item={item}
                  pinItem={pinKeywordSetItem}
                  deleteItem={deleteKeywordSetItem}
                  handler={changeKeywordSetName}
                />
              ))}
          </ul>
          <div className="flex justify-center">
            <Button variant="ghost" onClick={addKeywordSet}>
              <Plus strokeWidth={3} />
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={postKeywordSet}>
            설정 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AnnouncementDate({
  form
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
}) {
  const isFreeInputChecked = (value: string) => value === 'etc';
  const [announcementDate, setAnnouncementDate] = useState(DEFAULT_ANNOUNCEMENT_DAY_TYPE);

  const setDateRange = (value: string) => {
    const item = dateRange.find((item) => item.value === value);
    if (!item) return;

    form.setValue('announcementDateFrom', item.calculatedDate());
    form.setValue('announcementDateTo', isFreeInputChecked(value) ? '' : toReadableDate());
    setAnnouncementDate(value);
  };

  return (
    <tr>
      <th className="align-top">공고일</th>
      <td colSpan={5}>
        <div className="flex items-center gap-2 mb-[10px]">
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="announcementDateFrom"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      readOnly={!isFreeInputChecked(announcementDate)}
                      className="w-[140px]"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            ~
            <FormField
              control={form.control}
              name="announcementDateTo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      readOnly={!isFreeInputChecked(announcementDate)}
                      className="w-[140px]"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" />
            마감일 지난 공고 포함
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[5px]">
          {dateRange.map(({ label, value }) => (
            <label key={label} className="flex items-center gap-2">
              <input
                name="announcementDate"
                checked={value === announcementDate}
                value={value}
                type="radio"
                onChange={() => {
                  setDateRange(value);
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </td>
    </tr>
  );
}

export function KeywordContainer({ keywordSets }: { keywordSets: KeywordSet[] }) {
  const formModel: DetailedSearchForm = {
    keywordSets: {
      setA: {
        type: 'title',
        operation: 'or',
        text: '',
        tags: []
      },
      setB: {
        type: 'title',
        operation: 'or',
        text: '',
        tags: []
      },
      setC: {
        type: 'title',
        operation: 'or',
        text: '',
        tags: []
      },
      setD: {
        type: 'title',
        operation: 'or',
        text: '',
        tags: []
      },
      setF: {
        type: 'title',
        operation: 'or',
        text: '',
        tags: []
      },
      exceptionTitle: {
        label: '제목 제외 키워드',
        text: '',
        tags: []
      },
      exceptionKeyword: {
        label: '본문 제외 키워드',
        text: '',
        tags: []
      }
    },
    priceFrom: toReadableNumber(0),
    priceTo: toReadableNumber(DEFAULT_ANNOUNCEMENT_DEADLINE),
    announcementDateFrom:
      dateRange.find(({ value }) => value === DEFAULT_ANNOUNCEMENT_DAY_TYPE)?.calculatedDate() ||
      '',
    announcementDateTo: toReadableDate(),
    businessType: '',
    ignoreType: '',
    sortType: '',
    conditions: []
  };

  const form = useForm<DetailedSearchForm>({
    resolver: zodResolver(detailedSearchFormSchema),
    defaultValues: formModel
  });

  const [isPrivate, setIsPublic] = useState(false);

  const onSubmit = (values: DetailedSearchForm) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>
            {JSON.stringify(
              {
                ...values,
                priceFrom: +extractNumbers(values.priceFrom),
                priceTo: +extractNumbers(values.priceTo)
              },
              null,
              2
            )}
          </code>
        </pre>
      )
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <table className="search-table">
          <tbody>
            <KeywordSetHeadRow keywordSets={keywordSets} isPrivate={isPrivate}>
              <Button type="button">현재 세트 저장</Button>
              <SettingButton data={isPrivate} handler={setIsPublic} keywordSets={keywordSets} />
              <ToggleController className="ml-auto" data={isPrivate} handler={setIsPublic} />
            </KeywordSetHeadRow>

            <KeywordSetItemRow form={form} item={formModel.keywordSets} />

            <BusinessPriceRow form={form} />

            <AnnouncementDate form={form} />

            <tr>
              <th>사업 구분</th>
              <td>
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                        <option value="">전체</option>
                        <option value="용역">용역</option>
                        <option value="물품">물품</option>
                        <option value="공사">공사</option>
                        <option value="외자">외자</option>
                        <option value="기타">기타</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
              <th>기업 제한</th>
              <td>
                <FormField
                  control={form.control}
                  name="ignoreType"
                  render={({ field }) => (
                    <FormItem>
                      <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                        <option value="">전체 보기</option>
                        <option value="문서 참조 필요">문서 참조 필요</option>
                        <option value="대기업 참여 불가">대기업 참여 불가</option>
                        <option value="대기업 참여 가능">대기업 참여 가능</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
              <th>정렬 기준</th>
              <td>
                <FormField
                  control={form.control}
                  name="sortType"
                  render={({ field }) => (
                    <FormItem>
                      <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                        <option value="">정확도</option>
                        <option value="게시일 내림차순">게시일 내림차순</option>
                        <option value="게시일 오름차순">게시일 오름차순</option>
                        <option value="마감일 내림차순">마감일 내림차순</option>
                        <option value="마감일 오름차순">마감일 오름차순</option>
                        <option value="금액 내림차순">금액 내림차순</option>
                        <option value="금액 오름차순">금액 오름차순</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>

            <ConditionsRow form={form} />
          </tbody>
        </table>
        <div className="text-right">
          <Button>
            <Search color="#ffffff" strokeWidth={3} />
            검색하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
