'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  DetailedSearchForm,
  detailedSearchFormSchema,
  extractNumbers,
  KeywordSet,
  toReadableDate,
  toReadableNumber
} from '@/lib';
import { ToggleController } from '..';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ConditionsRow from './conditions-row';
import BusinessPriceRow from './business-price-row';
import KeywordSetItemRow from './keyword-set-item-row';
import KeywordSetHeadRow from './keyword-set-head-row';
import SelectFilterRow from './select-filter-row';
import AnnouncementDateRow from './announcement-date-row';
import SettingButton from './setting-button';

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

            <AnnouncementDateRow
              form={form}
              dateRange={dateRange}
              announcementDayType={DEFAULT_ANNOUNCEMENT_DAY_TYPE}
            />

            <SelectFilterRow form={form} />

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
