"use client";

import { Plus, Search, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast, useToast } from "@/hooks/use-toast";
import {
  cn,
  DetailedSearchForm,
  generatedId,
  getKeywordSets,
  toReadableDate,
  type KeywordSet,
} from "@/lib";
import { KeywordSetItem, ToggleController } from ".";

export function SettingButton({
  data: isPrivate,
  handler,
  keywordSet,
  setKeywordSet,
}: {
  data: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
  keywordSet: KeywordSet[] | null;
  setKeywordSet: Dispatch<SetStateAction<KeywordSet[] | null>>;
}) {
  const pinKeywordSetItem = (id: number) => {
    if (!keywordSet) return;

    setKeywordSet(
      keywordSet.map((item) =>
        item.id === id ? { ...item, isPined: !item.isPined } : item
      )
    );
  };

  const deleteKeywordSetItem = (id: number) => {
    if (!keywordSet) return;

    setKeywordSet(keywordSet.filter((item) => item.id !== id));
    toast({
      title: "그룹이 삭제되었습니다.",
    });
    // console.log(keywordSet); // TODO: 화면 출력은 올바르게 되지만 콘솔은 setKeywordSet 실행 직전의 값으로 찍힘. 원래 이런건가 ?_?
  };

  const changeKeywordSetName =
    (id: number) => (event: React.FormEvent<HTMLInputElement>) => {
      if (!keywordSet) return;

      setKeywordSet(
        keywordSet.map((item) =>
          item.id === id ? { ...item, name: event.currentTarget.value } : item
        )
      );
    };

  const { toast } = useToast();

  const getKeywordSetName = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = `${year}_${month}_${day}`;

    return `신규_그룹_${isPrivate ? "개인" : "공용"}_${dateString}`;
  };

  const addKeywordSet = () => {
    if (!keywordSet) return;

    setKeywordSet([
      ...keywordSet,
      {
        id: generatedId(keywordSet),
        name: getKeywordSetName(),
        isPined: false,
        isPrivate,
      },
    ]);
  };

  const postKeywordSet = () => {
    toast({
      title: "검색 그룹이 설정되었습니다.",
      description: (
        <pre>
          <code>{JSON.stringify(keywordSet, null, 2)}</code>
        </pre>
      ),
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
            {keywordSet
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
  target,
  context,
  handleChangeKeywordSet,
}: {
  target: string;
  context: {
    label?: string;
    type?: string;
    operation?: string;
    text: string;
    tags: string[];
  };
  handleChangeKeywordSet: (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  return (
    <>
      <select
        name={`${target}.type`}
        value={context.type}
        onChange={handleChangeKeywordSet}
      >
        <option value="title">제목</option>
        <option value="text">본문</option>
      </select>
      <select
        name={`${target}.operation`}
        value={context.operation}
        onChange={handleChangeKeywordSet}
      >
        <option value="or">OR</option>
        <option value="and">AND</option>
      </select>
    </>
  );
}

export function AnnouncementDate({
  formModel,
  setFormModel,
  handleChange,
}: {
  formModel: DetailedSearchForm;
  setFormModel: Dispatch<SetStateAction<DetailedSearchForm>>;
  handleChange: (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  const dateRange = [
    {
      label: "하루 전",
      value: "inADay",
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() - 1);
        return date;
      },
    },
    {
      label: "일주일 전",
      value: "inAWeek",
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() - 7);
        return date;
      },
    },
    {
      label: "한 달 전",
      value: "inAMonth",
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setMonth(today.getMonth() - 1);
        return date;
      },
    },
    {
      label: "일 년 전",
      value: "inAYear",
      calculatedDate() {
        const today = new Date();
        const date = new Date(today);
        date.setFullYear(today.getFullYear() - 1);
        return date;
      },
    },
    {
      label: "전체 조회",
      value: "all",
      calculatedDate() {
        return new Date(2020, 0, 1);
      },
    },
    {
      label: "자유 입력",
      value: "etc",
    },
  ];

  const isFreeInput = (value: string) => value === "etc";

  const setDateRange = (value: string) => {
    const item = dateRange.find((item) => item.value === value);
    if (!item) return;

    const date = item.calculatedDate?.();

    setFormModel({
      ...formModel,
      announcementDateFrom: isFreeInput(value) ? "" : toReadableDate(),
      announcementDateTo: isFreeInput(value) ? "" : toReadableDate(),
    });
  };

  const [announcementDate, setAnnouncementDate] = useState("inAWeek");

  useEffect(() => {
    setDateRange(announcementDate);
  }, [announcementDate]);

  return (
    <tr>
      <th className="align-top">공고일</th>
      <td colSpan={5}>
        <div className="flex items-center gap-2 mb-[10px]">
          <div className="flex items-center gap-2">
            <Input
              readOnly={!isFreeInput(announcementDate)}
              className="w-[140px]"
              type="date"
              name="announcementDateFrom"
              value={formModel.announcementDateFrom}
              onChange={handleChange}
            />
            ~
            <Input
              readOnly={!isFreeInput(announcementDate)}
              className="w-[140px]"
              type="date"
              name="announcementDateTo"
              value={formModel.announcementDateTo}
              onChange={handleChange}
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
  const [formModel, setFormModel] = useState<DetailedSearchForm>({
    keywordSets: {
      setA: {
        type: "title",
        operation: "or",
        text: "",
        tags: [],
      },
      setB: {
        type: "title",
        operation: "or",
        text: "",
        tags: [],
      },
      setC: {
        type: "title",
        operation: "or",
        text: "",
        tags: [],
      },
      setD: {
        type: "title",
        operation: "or",
        text: "",
        tags: [],
      },
      setF: {
        type: "title",
        operation: "or",
        text: "",
        tags: [],
      },
      exceptionTitle: {
        label: "제목 제외 키워드",
        text: "",
        tags: [],
      },
      exceptionKeyword: {
        label: "본문 제외 키워드",
        text: "",
        tags: [],
      },
    },
    priceFrom: 0,
    priceTo: 5_000_000,
    announcementDateFrom: "",
    announcementDateTo: "",
    businessType: "",
    ignoreType: "",
    sortType: "",
    condition: {
      업종조건_충족: true,
      물품조건_충족: false,
      공동수급_허용: false,
      실적제한_없음: false,
      인적제한_없음: false,
    },
  });

  const [isPrivate, setIsPublic] = useState(false);

  const handleChangeKeywordSet = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    const [depth1, depth2] = name.split(".");

    setFormModel({
      ...formModel,
      keywordSets: {
        ...formModel.keywordSets,
        [depth1]: {
          ...formModel.keywordSets[depth1],
          [depth2]: value,
        },
      },
    });
  };

  const handleEnter =
    (path: string) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { value },
      } = event;

      if (key !== "Enter") return;

      event.preventDefault();
      addTag(path, value);
    };

  const addTag = (path: string, tag: string) => {
    if (!tag) return;

    setFormModel({
      ...formModel,
      keywordSets: {
        ...formModel.keywordSets,
        [path]: {
          ...formModel.keywordSets[path],
          text: "",
          tags: [...new Set([...formModel.keywordSets[path].tags, tag])],
        },
      },
    });
  };

  const deleteTag = (path: string, tag: string) => {
    setFormModel({
      ...formModel,
      keywordSets: {
        ...formModel.keywordSets,
        [path]: {
          ...formModel.keywordSets[path],
          text: "",
          tags: formModel.keywordSets[path].tags.filter(
            (originTag) => originTag !== tag
          ),
        },
      },
    });
  };

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement> // TODO: 동적 타입(Generic?)으로 적용되게 개선 필요
  ) => {
    const { name, value } = event.currentTarget;

    setFormModel({
      ...formModel,
      [name]: value,
    });
  };

  const handleCondition = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;

    setFormModel({
      ...formModel,
      condition: {
        ...formModel.condition,
        [name]: checked,
      },
    });
  };

  const [isPriceLimit, togglePriceLimit] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify(formModel, null, 2)}</code>
        </pre>
      ),
    });
  };

  const [keywordSet, setKeywordSet] = useState<KeywordSet[] | null>(null);

  useEffect(() => {
    if (keywordSet?.length) return; // TODO: 이 부분 제거하면 useEffect 무한루프 발생. useCallback으로 개선 필요

    setKeywordSet(getKeywordSets());
  }, [keywordSet]);

  const DEFAULT_KEYWORD_SET_SIZE = 2;
  const [keywordSetSize, setKeywordSetSize] = useState(
    DEFAULT_KEYWORD_SET_SIZE
  );
  const toggleButtonLabel =
    keywordSetSize === DEFAULT_KEYWORD_SET_SIZE ? "열기" : "접기";
  const toggleKeywordSetSize = () => {
    setKeywordSetSize(
      keywordSetSize === DEFAULT_KEYWORD_SET_SIZE
        ? Object.keys(formModel.keywordSets).length
        : DEFAULT_KEYWORD_SET_SIZE
    );
  };

  return (
    // TODO: react hook form 으로 개선하기
    <form onSubmit={handleSubmit}>
      <table className="search-table">
        <tbody>
          <tr>
            <th>키워드세트</th>
            <td colSpan={5}>
              <div className="flex items-center gap-2">
                <select className="w-[160px]">
                  <option value="">그룹을 선택하세요</option>
                  {keywordSet
                    ?.filter((item) => item.isPrivate === isPrivate)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <Button type="button">현재 세트 저장</Button>
                <SettingButton
                  data={isPrivate}
                  handler={setIsPublic}
                  keywordSet={keywordSet}
                  setKeywordSet={setKeywordSet}
                />
                <ToggleController
                  className="ml-auto"
                  data={isPrivate}
                  handler={setIsPublic}
                />
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
                      <div
                        key={key}
                        className="flex flex-wrap items-center gap-2"
                      >
                        {context.label || (
                          <KeywordSetSelect
                            target={key}
                            context={context}
                            handleChangeKeywordSet={handleChangeKeywordSet}
                          />
                        )}
                        <Input
                          className="w-[180px]"
                          name={`${key}.text`}
                          value={context.text}
                          placeholder="키워드를 입력해보세요"
                          onChange={handleChangeKeywordSet}
                          onKeyDown={handleEnter(key)}
                        />
                        <Button
                          type="button"
                          onClick={() => addTag(key, context.text)}
                        >
                          <Plus />
                        </Button>
                        <ul className="flex flex-wrap items-center gap-2">
                          {context.tags.map((tag) => (
                            <li
                              key={tag}
                              className="flex items-center gap-2 bg-violet-400 text-white h-[30px] px-[10px] rounded-[30px]"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => deleteTag(key, tag)}
                              >
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
                  <Input
                    className="w-[140px]"
                    type="number"
                    inputMode="numeric"
                    name="priceFrom"
                    value={formModel.priceFrom}
                    onChange={handleChange}
                  />
                  ~
                  <Input
                    className={cn("w-[140px]", isPriceLimit ? "invisible" : "")}
                    type="number"
                    inputMode="numeric"
                    name="priceTo"
                    value={formModel.priceTo}
                    onChange={handleChange}
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

          <AnnouncementDate
            formModel={formModel}
            setFormModel={setFormModel}
            handleChange={handleChange}
          />

          <tr>
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
          </tr>

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
          </tr>
        </tbody>
      </table>
      <div className="text-right">
        <Button>
          <Search color="#ffffff" strokeWidth={3} />
          검색하기
        </Button>
      </div>
    </form>
  );
}
