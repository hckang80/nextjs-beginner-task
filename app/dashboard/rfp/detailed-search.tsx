"use client";

import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { getKeywordSets, type KeywordSet } from "@/lib";
import { KeywordSetItem } from "./keyword-set-item";
import { getMaxNumber } from "@/lib";

export function SettingButton({
  data: isPrivate,
  handler,
}: {
  data: boolean;
  handler: Dispatch<SetStateAction<boolean>>; // TODO: 상태 핸들러 전달 방식 검토 필요
}) {
  const [keywordSet, setKeywordSet] = useState<KeywordSet[] | null>(null);

  useEffect(() => {
    if (keywordSet?.length) return; // TODO: 이 부분 제거하면 useEffect 무한루프 발생. 더 적절한 방법 확인 필요

    setKeywordSet(getKeywordSets());
  }, [keywordSet]);

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

  const generatedId = (array: KeywordSet[]) => {
    return getMaxNumber(array.map(({ id }) => id)) + 1;
  };

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
      description: <code>{JSON.stringify(keywordSet)}</code>,
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
          <div className="flex items-center gap-1 justify-between mb-4">
            <div className="flex items-center gap-1">
              공용
              <Switch checked={isPrivate} onCheckedChange={handler} />
              개인
            </div>
            선택하신 상단의 그룹이 기본 검색 조건으로 설정됩니다
          </div>
          <div>{`keywordSet: ${JSON.stringify(keywordSet)}`}</div>
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

export function DetailedSearch() {
  const [formModal, setFormModel] = useState({
    priceFrom: 0,
    priceTo: 5_000_000,
    businessType: "",
    ignoreType: "",
    sortType: "",
  });

  const [isPrivate, setIsPublic] = useState(false);

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement> // TODO: 동적 타입(Generic?)으로 적용되게 개선 필요
  ) => {
    const { name, value } = event.currentTarget;

    setFormModel({
      ...formModal,
      [name]: value,
    });
  };

  const [isPriceLimit, togglePriceLimit] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast({
      title: "You submitted the following values:",
      description: <code>{JSON.stringify(formModal)}</code>,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {`isPrivate: ${isPrivate}`}
      {`formModal: ${JSON.stringify(formModal)}`}
      <table>
        <tbody>
          <tr>
            <th>키워드세트</th>
            <td colSpan={5}>
              <div className="flex items-center gap-1">
                <select name="" id="">
                  <option value="">그룹을 선택하세요</option>
                </select>
                <Button type="button">현재 세트 저장</Button>
                <SettingButton data={isPrivate} handler={setIsPublic} />
              </div>
            </td>
          </tr>
          <tr>
            <th>사업 금액</th>
            <td colSpan={5}>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    inputMode="numeric"
                    name="priceFrom"
                    value={formModal.priceFrom}
                    onChange={handleChange}
                  />
                  ~
                  <Input
                    type="number"
                    inputMode="numeric"
                    name="priceTo"
                    value={formModal.priceTo}
                    onChange={handleChange}
                    className={isPriceLimit ? "invisible" : ""}
                  />
                </div>

                <label className="flex items-center gap-2">
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

          <tr>
            <th>공고일</th>
            <td colSpan={5}>TODO: 달력 범위 선택</td>
          </tr>

          <tr>
            <th>사업 구분</th>
            <td>
              <select
                name="businessType"
                value={formModal.businessType}
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
                name="ignoreType"
                value={formModal.ignoreType}
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
                name="sortType"
                value={formModal.sortType}
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
              <label>
                <input type="checkbox" />
                업종조건 충족
              </label>
              <label>
                <input type="checkbox" />
                물품조건 충족
              </label>
              <label>
                <input type="checkbox" />
                공동수급 허용
              </label>
              <label>
                <input type="checkbox" />
                실적제한 없음
              </label>
              <label>
                <input type="checkbox" />
                인적제한 없음
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <button>검색하기</button>
    </form>
  );
}
