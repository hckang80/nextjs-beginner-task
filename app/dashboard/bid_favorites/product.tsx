"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  AnnouncementContext,
  generatedId,
  suggestedStates,
  Tag,
  toReadableDate,
} from "@/lib";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useTag } from "./context/MyTagContext";

export function Product({
  isVisibleMemoContext,
  product,
  deleteFavorite,
}: {
  isVisibleMemoContext: boolean;
  product: AnnouncementContext;
  deleteFavorite: (id: number) => void;
}) {
  const { id, name, price, type, source, createdAt, endedAt } = product;

  const saveSuggestedState =
    (id: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      toast({
        title: "You submitted the following values:",
        description: (
          <pre>
            <code>{JSON.stringify({ id, value }, null, 2)}</code>
          </pre>
        ),
      });
    };

  const [memo, setMemo] = useState<Record<string, string>>({});

  const handleMemo =
    (id: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;

      setMemo({
        ...memo,
        [id]: value,
      });
    };

  const { toast } = useToast();

  const saveMemo = (id: number) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify({ id, value: memo[id] }, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <tbody>
      <tr>
        <td>입찰 공고</td>
        <td>{type}</td>
        <td style={{ textAlign: "left" }}>
          <Link href={`/dashboard/rfp/${id}`}>{name}</Link>
        </td>
        <td>{price}</td>
        <td>{source}</td>
        <td>{toReadableDate(createdAt)}</td>
        <td>{toReadableDate(endedAt)}</td>
        <td>
          <DeleteButton id={id} deleteFavorite={deleteFavorite} />
        </td>
      </tr>
      {isVisibleMemoContext && (
        <tr>
          <td colSpan={8}>
            <div className="flex justify-between items-center gap-2 px-[20px]">
              <div className="shrink-0">
                <TagEditButton name={name} />
              </div>
              <dl className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <dt className="shrink-0 font-bold">담당</dt>
                  <dd>과제클라이원트</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="shrink-0 font-bold">제안상태</dt>
                  <dd>
                    <select onChange={saveSuggestedState(id)}>
                      {suggestedStates.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="shrink-0 font-bold">비고</dt>
                  <dd className="contents">
                    <Textarea
                      placeholder="필요한 메모를 하세요.."
                      className="bg-white"
                      onChange={handleMemo(id)}
                    />
                    <Button onClick={() => saveMemo(id)}>수정</Button>
                  </dd>
                </div>
              </dl>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}

export function TagEditButton({ name }: { name: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-[12px]">
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <AllTags />
      </DialogContent>
    </Dialog>
  );
}

export function AllTags() {
  const [tag, inputTag] = useState("");
  const { tags, setTags } = useTag();

  const addTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = [
      ...tags,
      {
        id: generatedId(tags),
        text: tag,
        bgColor: "rgb(166, 161, 219)",
      },
    ];

    setTags(result);
    inputTag("");
  };

  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const editTag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setIsOpenEditor(!isOpenEditor);
  };

  return (
    <div>
      <header className="flex justify-between gap-2">
        <h3>전체태그</h3>
        <form onSubmit={addTag} className="flex gap-[4px]">
          <Input
            value={tag}
            placeholder="태그 추가"
            onChange={(event) => inputTag(event.target.value)}
            maxLength={10}
          />
          <Button>
            <Plus />
          </Button>
        </form>
      </header>

      {isOpenEditor && (
        <div className="flex justify-between items-align gap-2 mt-[15px]">
          <div className="flex items-align gap-[4px]">
            <Input />
            <Input type="color" className="w-[40px] p-0" />
          </div>
          <div className="flex items-align gap-[4px]">
            <Button>태그 수정</Button>
            <Button variant="destructive">태그 삭제</Button>
            <Button variant="outline" onClick={() => setIsOpenEditor(false)}>
              수정 완료
            </Button>
          </div>
        </div>
      )}

      <ul className="flex flex-wrap gap-[4px] mt-[20px]">
        {tags.map(({ id, text, bgColor }) => (
          <li
            key={id}
            style={{ background: bgColor }}
            className="flex justify-between items-center basis-[150px] rounded-[4px] px-[10px] h-[30px] text-white text-[12px] cursor-pointer"
          >
            {text}
            <button className="p-[5px]" onClick={editTag}>
              <Pencil size={10} color="#ffffff" strokeWidth={1.25} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeleteButton({
  id,
  deleteFavorite, // TODO: Prop Drilling이 심함. 개선 필요
}: {
  id: number;
  deleteFavorite: (id: number) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-[10px]">
          <Trash2 size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            선택된 프로젝트를 관심 목록에서 삭제하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteFavorite(id)}>
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
