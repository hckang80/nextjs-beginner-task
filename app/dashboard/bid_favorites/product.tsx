"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnnouncementContext, suggestedStates, toReadableDate } from "@/lib";
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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
        <AllTags />
      </DialogContent>
    </Dialog>
  );
}

export function AllTags() {
  const [tag, inputTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTags([...new Set([...tags, tag])]);
    inputTag("");
  };

  return (
    <div>
      <header>
        <h3>전체태그</h3>
        <form onSubmit={addTag}>
          <Input
            value={tag}
            placeholder="태그 추가"
            onChange={(event) => inputTag(event.target.value)}
          />
          <Button>태그 초기화</Button>
        </form>
      </header>
      <ul>
        {tags.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function DeleteButton({
  id,
  deleteFavorite, // TODO: Props Drilling이 심함. 개선 필요
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
