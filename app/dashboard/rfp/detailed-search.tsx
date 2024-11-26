'use client';

import { Plus, Search, Settings, X } from 'lucide-react';
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
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { toast, useToast } from '@/hooks/use-toast';
import {
  cn,
  DetailedSearchForm,
  detailedSearchFormSchema,
  generatedId,
  toReadableDate
} from '@/lib';
import { KeywordSetItem, ToggleController } from '.';
import { useBidAnnouncement } from './context/BidAnnouncementContext';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const DEFAULT_ANNOUNCEMENT_DEADLINE = 500_000_000;

export function SettingButton({
  data: isPrivate,
  handler
}: {
  data: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
}) {
  const { keywordSetsContext, setKeywordSetsContext } = useBidAnnouncement();

  const pinKeywordSetItem = (id: number) => {
    if (!keywordSetsContext) return;

    setKeywordSetsContext(
      keywordSetsContext.map((item) =>
        item.id === id ? { ...item, isPined: !item.isPined } : item
      )
    );
  };

  const deleteKeywordSetItem = (id: number) => {
    if (!keywordSetsContext) return;

    setKeywordSetsContext(keywordSetsContext.filter((item) => item.id !== id));
    toast({
      title: '그룹이 삭제되었습니다.'
    });
    // console.log(keywordSetsContext); // TODO: 화면 출력은 올바르게 되지만 콘솔은 setKeywordSetsContext 실행 직전의 값으로 찍힘. 원래 이런건가 ?_?
  };

  const changeKeywordSetName = (id: number) => (event: React.FormEvent<HTMLInputElement>) => {
    if (!keywordSetsContext) return;

    setKeywordSetsContext(
      keywordSetsContext.map((item) =>
        item.id === id ? { ...item, name: event.currentTarget.value } : item
      )
    );
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
    if (!keywordSetsContext) return;

    setKeywordSetsContext([
      ...keywordSetsContext,
      {
        id: generatedId(keywordSetsContext),
        name: getKeywordSetName(),
        isPined: false,
        isPrivate
      }
    ]);
  };

  const postKeywordSet = () => {
    toast({
      title: '검색 그룹이 설정되었습니다.',
      description: (
        <pre>
          <code>{JSON.stringify(keywordSetsContext, null, 2)}</code>
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
            {keywordSetsContext
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

export function KeywordSetSelect({
  form,
  target
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
  target: string;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={`keywordSets.${target}.type`}
        render={({ field }) => (
          <FormItem>
            <select value={field.value} onChange={field.onChange}>
              <option value="title">제목</option>
              <option value="text">본문</option>
            </select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`keywordSets.${target}.operation`}
        render={({ field }) => (
          <FormItem>
            <select value={field.value} onChange={field.onChange}>
              <option value="or">OR</option>
              <option value="and">AND</option>
            </select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export function AnnouncementDate({
  form
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
}) {
  const dateRange = [
    {
      label: '하루 전',
      value: 'inADay',
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() - 1);
        return date;
      }
    },
    {
      label: '일주일 전',
      value: 'inAWeek',
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() - 7);
        return date;
      }
    },
    {
      label: '한 달 전',
      value: 'inAMonth',
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setMonth(today.getMonth() - 1);
        return date;
      }
    },
    {
      label: '일 년 전',
      value: 'inAYear',
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setFullYear(today.getFullYear() - 1);
        return date;
      }
    },
    {
      label: '전체 조회',
      value: 'all',
      calculatedDate() {
        return new Date(2020, 0, 1);
      }
    },
    {
      label: '자유 입력',
      value: 'etc'
    }
  ];

  const isFreeInput = (value: string) => value === 'etc';

  const setDateRange = (value: string) => {
    const item = dateRange.find((item) => item.value === value);
    if (!item) return;

    const date = item.calculatedDate?.();

    form.setValue('announcementDateFrom', isFreeInput(value) ? '' : toReadableDate(date));
    form.setValue('announcementDateTo', isFreeInput(value) ? '' : toReadableDate());
  };

  const [announcementDate, setAnnouncementDate] = useState('inAWeek');

  useEffect(() => {
    setDateRange(announcementDate);
  }, [announcementDate]);

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
                      readOnly={!isFreeInput(announcementDate)}
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
                      readOnly={!isFreeInput(announcementDate)}
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
                  setAnnouncementDate(value);
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

export function DetailedSearch() {
  const formModel = {
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
    priceFrom: 0,
    priceTo: DEFAULT_ANNOUNCEMENT_DEADLINE,
    announcementDateFrom: '',
    announcementDateTo: '',
    businessType: '',
    ignoreType: '',
    sortType: '',
    condition: {
      업종조건_충족: true,
      물품조건_충족: false,
      공동수급_허용: false,
      실적제한_없음: false,
      인적제한_없음: false
    }
  };

  const form = useForm<DetailedSearchForm>({
    resolver: zodResolver(detailedSearchFormSchema),
    defaultValues: formModel
  });

  // const [formModel, setFormModel] = useState<DetailedSearchForm>({
  //   keywordSets: {
  //     setA: {
  //       type: 'title',
  //       operation: 'or',
  //       text: '',
  //       tags: []
  //     },
  //     setB: {
  //       type: 'title',
  //       operation: 'or',
  //       text: '',
  //       tags: []
  //     },
  //     setC: {
  //       type: 'title',
  //       operation: 'or',
  //       text: '',
  //       tags: []
  //     },
  //     setD: {
  //       type: 'title',
  //       operation: 'or',
  //       text: '',
  //       tags: []
  //     },
  //     setF: {
  //       type: 'title',
  //       operation: 'or',
  //       text: '',
  //       tags: []
  //     },
  //     exceptionTitle: {
  //       label: '제목 제외 키워드',
  //       text: '',
  //       tags: []
  //     },
  //     exceptionKeyword: {
  //       label: '본문 제외 키워드',
  //       text: '',
  //       tags: []
  //     }
  //   },
  //   priceFrom: 0,
  //   priceTo: DEFAULT_ANNOUNCEMENT_DEADLINE,
  //   announcementDateFrom: '',
  //   announcementDateTo: '',
  //   businessType: '',
  //   ignoreType: '',
  //   sortType: '',
  //   condition: {
  //     업종조건_충족: true,
  //     물품조건_충족: false,
  //     공동수급_허용: false,
  //     실적제한_없음: false,
  //     인적제한_없음: false
  //   }
  // });

  const [isPrivate, setIsPublic] = useState(false);

  const handleChangeKeywordSet = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    const [depth1, depth2] = name.split('.');

    setFormModel({
      ...formModel,
      keywordSets: {
        ...formModel.keywordSets,
        [depth1]: {
          ...formModel.keywordSets[depth1],
          [depth2]: value
        }
      }
    });
  };

  const handleEnter =
    (path: `keywordSets.${string}`) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { value }
      } = event;

      if (key !== 'Enter') return;

      event.preventDefault();

      addTag(path, value);
    };

  const addTag = (path: `keywordSets.${string}`, value: string) => {
    if (!value) return;

    form.setValue(`${path}.tags`, [...new Set([...form.getValues(`${path}.tags`), value])]);
    form.resetField(`${path}.text`);
  };

  const deleteTag = (path: string, tag: string) => {
    setFormModel({
      ...formModel,
      keywordSets: {
        ...formModel.keywordSets,
        [path]: {
          ...formModel.keywordSets[path],
          text: '',
          tags: formModel.keywordSets[path].tags.filter((originTag) => originTag !== tag)
        }
      }
    });
  };

  const [numberFormattedForm, setNumberFormattedForm] = useState({
    priceFrom: '0',
    priceTo: Number(DEFAULT_ANNOUNCEMENT_DEADLINE).toLocaleString('en-US')
  });

  const setReadableFormat = (key: string, value: string) => {
    setNumberFormattedForm({
      ...numberFormattedForm,
      [key]: Number(value).toLocaleString('en-US')
    });
  };

  const omitExcludingNumbers = (value: string) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleChange = (
    // TODO: 동적 타입(Generic?)으로 적용되게 개선 필요
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
    numberFormatter?: string
  ) => {
    const { name, value } = event.currentTarget;

    if (numberFormatter) setReadableFormat(numberFormatter, omitExcludingNumbers(value));

    setFormModel({
      ...formModel,
      [name]: numberFormatter ? omitExcludingNumbers(value) : value
    });
  };

  const handleCondition = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;

    setFormModel({
      ...formModel,
      condition: {
        ...formModel.condition,
        [name]: checked
      }
    });
  };

  const [isPriceLimit, togglePriceLimit] = useState(false);

  const onSubmit = (values: DetailedSearchForm) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    });
  };

  const { keywordSetsContext } = useBidAnnouncement();

  const DEFAULT_KEYWORD_SET_SIZE = 2;
  const [keywordSetSize, setKeywordSetSize] = useState(DEFAULT_KEYWORD_SET_SIZE);
  const toggleButtonLabel = keywordSetSize === DEFAULT_KEYWORD_SET_SIZE ? '열기' : '접기';
  const toggleKeywordSetSize = () => {
    setKeywordSetSize(
      keywordSetSize === DEFAULT_KEYWORD_SET_SIZE
        ? Object.keys(formModel.keywordSets).length
        : DEFAULT_KEYWORD_SET_SIZE
    );
  };

  return (
    // TODO: react hook form 으로 개선하기
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <table className="search-table">
          <tbody>
            <tr>
              <th>키워드세트</th>
              <td colSpan={5}>
                <div className="flex items-center gap-2">
                  <select className="w-[160px]">
                    <option value="">그룹을 선택하세요</option>
                    {keywordSetsContext
                      ?.filter((item) => item.isPrivate === isPrivate)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <Button type="button">현재 세트 저장</Button>
                  <SettingButton data={isPrivate} handler={setIsPublic} />
                  <ToggleController className="ml-auto" data={isPrivate} handler={setIsPublic} />
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan={6}>
                <div className="flex flex-col gap-2">
                  {Object.entries(formModel.keywordSets)
                    .slice(0, keywordSetSize)
                    .map(([key, context], index) => {
                      return (
                        <div key={key} className="flex flex-wrap items-center gap-2">
                          {context.label || <KeywordSetSelect form={form} target={key} />}
                          <FormField
                            control={form.control}
                            name={`keywordSets.${key}.text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-[180px]"
                                    placeholder="키워드를 입력해보세요"
                                    {...field}
                                    onKeyDown={handleEnter(`keywordSets.${key}`)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              addTag(
                                `keywordSets.${key}`,
                                form.getValues(`keywordSets.${key}.text`)
                              )
                            }
                          >
                            <Plus />
                          </Button>
                          <ul className="flex flex-wrap items-center gap-2">
                            {form.getValues(`keywordSets.${key}.tags`).map((tag) => (
                              <li
                                key={tag}
                                className="flex items-center gap-2 bg-violet-400 text-white h-[30px] px-[10px] rounded-[30px]"
                              >
                                {tag}
                                <button type="button" onClick={() => deleteTag(key, tag)}>
                                  <X size={12} color="#ffffff" strokeWidth={3} />
                                </button>
                              </li>
                            ))}
                          </ul>
                          {index + 1 === DEFAULT_KEYWORD_SET_SIZE && (
                            <Button
                              type="button"
                              variant="secondary"
                              className="ml-auto"
                              onClick={toggleKeywordSetSize}
                            >
                              키워드셋 {toggleButtonLabel}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                </div>
              </td>
            </tr>

            <tr>
              <th>사업 금액</th>
              <td colSpan={5}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="priceFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-[140px]"
                              inputMode="numeric"
                              {...field}
                              onChange={(event) =>
                                field.onChange(+event.target.value.replace(/[^0-9]/g, ''))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    ~
                    <FormField
                      control={form.control}
                      name="priceTo"
                      render={({ field }) => (
                        <FormItem className={isPriceLimit ? 'invisible' : ''}>
                          <FormControl>
                            <Input
                              className="w-[140px]"
                              inputMode="numeric"
                              {...field}
                              onChange={(event) =>
                                field.onChange(+event.target.value.replace(/[^0-9]/g, ''))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[14px]">
                    <input
                      type="checkbox"
                      checked={isPriceLimit}
                      onChange={({ target: { checked } }) => {
                        togglePriceLimit(checked);
                      }}
                    />
                    금액 제한 없음
                  </label>
                </div>
              </td>
            </tr>

            <AnnouncementDate form={form} />

            {/* <tr>
              <th>사업 구분</th>
              <td>
                <select
                  className="w-[140px]"
                  name="businessType"
                  value={formModel.businessType}
                  onChange={handleChange}
                >
                  <option value="">전체</option>
                  <option value="용역">용역</option>
                  <option value="물품">물품</option>
                  <option value="공사">공사</option>
                  <option value="외자">외자</option>
                  <option value="기타">기타</option>
                </select>
              </td>
              <th>기업 제한</th>
              <td>
                <select
                  className="w-[140px]"
                  name="ignoreType"
                  value={formModel.ignoreType}
                  onChange={handleChange}
                >
                  <option value="">전체 보기</option>
                  <option value="문서 참조 필요">문서 참조 필요</option>
                  <option value="대기업 참여 불가">대기업 참여 불가</option>
                  <option value="대기업 참여 가능">대기업 참여 가능</option>
                </select>
              </td>
              <th>정렬 기준</th>
              <td>
                <select
                  className="w-[140px]"
                  name="sortType"
                  value={formModel.sortType}
                  onChange={handleChange}
                >
                  <option value="">정확도</option>
                  <option value="게시일 내림차순">게시일 내림차순</option>
                  <option value="게시일 오름차순">게시일 오름차순</option>
                  <option value="마감일 내림차순">마감일 내림차순</option>
                  <option value="마감일 오름차순">마감일 오름차순</option>
                  <option value="금액 내림차순">금액 내림차순</option>
                  <option value="금액 오름차순">금액 오름차순</option>
                </select>
              </td>
            </tr> */}
            {/* 
            <tr>
              <th>조건</th>
              <td colSpan={5}>
                <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[5px]">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="업종조건_충족"
                      checked={formModel.condition.업종조건_충족}
                      onChange={handleCondition}
                    />
                    업종조건 충족
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="물품조건_충족"
                      checked={formModel.condition.물품조건_충족}
                      onChange={handleCondition}
                    />
                    물품조건 충족
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="공동수급_허용"
                      checked={formModel.condition.공동수급_허용}
                      onChange={handleCondition}
                    />
                    공동수급 허용
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="실적제한_없음"
                      checked={formModel.condition.실적제한_없음}
                      onChange={handleCondition}
                    />
                    실적제한 없음
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="인적제한_없음"
                      checked={formModel.condition.인적제한_없음}
                      onChange={handleCondition}
                    />
                    인적제한 없음
                  </label>
                </div>
              </td>
            </tr> */}
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
