'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AnnouncementContext,
  AppliedTag,
  fetcher,
  generatedId,
  suggestedStates,
  Tag,
  toReadableDate
} from '@/lib';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useLayoutData } from './LayoutContextProvider';
import { useQueries, useQueryClient } from '@tanstack/react-query';

export function Product({
  isVisibleMemoContext,
  product,
  deleteFavorite
}: {
  isVisibleMemoContext: boolean;
  product: AnnouncementContext;
  deleteFavorite: (id: number) => void;
}) {
  const { id, name, price, type, source, createdAt, endedAt } = product;

  const saveSuggestedState = (id: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>{JSON.stringify({ id, value }, null, 2)}</code>
        </pre>
      )
    });
  };

  const [memo, setMemo] = useState<Record<string, string>>({});

  const handleMemo = (id: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    setMemo({
      ...memo,
      [id]: value
    });
  };

  const { toast } = useToast();

  const saveMemo = (id: number) => {
    const memoContents = memo[id];
    if (!memoContents) return;

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>{JSON.stringify({ id, value: memoContents }, null, 2)}</code>
        </pre>
      )
    });
  };

  const { data } = useLayoutData();

  const [{ data: tags }, { data: appliedTags }] = useQueries({
    queries: [
      {
        queryKey: ['tags'],
        queryFn: () => fetcher<Tag[]>('/tags.json'),
        initialData: data[1]
      },
      {
        queryKey: ['appliedTags'],
        queryFn: () => fetcher<AppliedTag[]>('/appliedTags.json'),
        initialData: data[2]
      }
    ]
  });

  const tagsByBId = appliedTags.find((item) => item.id === id);
  const generatedTags = tags.filter((item) => tagsByBId?.tags.includes(item.id));

  return (
    <tbody>
      <tr>
        <td>입찰 공고</td>
        <td>{type}</td>
        <td style={{ textAlign: 'left' }}>
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
            <div className="flex flex-wrap justify-between items-center gap-2 px-[20px]">
              <div className="flex items-center gap-[4px]">
                <div className="flex flex-wrap items-center gap-[4px]">
                  {generatedTags.map(({ id, text, bgColor }) => (
                    <Badge key={id} style={{ background: bgColor }} className="shrink-0">
                      {text}
                    </Badge>
                  ))}
                </div>
                <TagEditButton bid={id} name={name} generatedTags={generatedTags} />
              </div>
              <dl className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <dt className="shrink-0 font-bold">담당</dt>
                  <dd>Sky</dd>
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

export function TagEditButton({
  bid,
  name,
  generatedTags
}: {
  bid: number;
  name: string;
  generatedTags: Tag[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-[12px] shrink-0">
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <TagEditor bid={bid} generatedTags={generatedTags} />
      </DialogContent>
    </Dialog>
  );
}

export function TagEditor({ bid, generatedTags }: { bid: number; generatedTags: Tag[] }) {
  const { toast } = useToast();
  const [tag, inputTag] = useState('');
  const queryClient = useQueryClient();

  const { data } = useLayoutData();

  const [{ data: tags }, { data: appliedTags }] = useQueries({
    queries: [
      {
        queryKey: ['tags'],
        queryFn: () => fetcher<Tag[]>('/tags.json'),
        initialData: data[1]
      },
      {
        queryKey: ['appliedTags'],
        queryFn: () => fetcher<AppliedTag[]>('/appliedTags.json'),
        initialData: data[2]
      }
    ]
  });

  const resetTags = (bid: number) => {
    const result = appliedTags.map((item) => (item.id === bid ? { ...item, tags: [] } : item));
    queryClient.setQueryData(['appliedTags'], () => result);
  };

  const addTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tag) return;

    const hasTag = tags.some(({ text }) => text === tag);
    if (hasTag) return;

    const result = [
      ...tags,
      {
        id: generatedId(tags),
        text: tag,
        bgColor: 'rgb(166, 161, 219)'
      }
    ];
    queryClient.setQueryData(['tags'], () => result);

    inputTag('');
  };

  const applyTag = (bid: number, id: number) => {
    const result = appliedTags.map((item) =>
      item.id === bid ? { ...item, tags: [...new Set([...item.tags, id])] } : item
    );
    queryClient.setQueryData(['appliedTags'], () => [...result]);
  };

  const deleteAppliedTags = (bid: number, id: number) => {
    queryClient.setQueryData<AppliedTag[]>(['appliedTags'], (appliedTags) =>
      appliedTags?.map((item) =>
        item.id === bid ? { ...item, tags: item.tags.filter((tag) => tag !== id) } : item
      )
    );
  };

  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag>({
    id: 0,
    text: '',
    bgColor: ''
  });
  const openTagEditor =
    (id: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      setIsOpenEditor(!isOpenEditor);
      const currentItem = tags.find((item) => item.id === id);
      if (currentItem) setSelectedTag(currentItem);
    };

  const changeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag({
      ...selectedTag,
      text: event.currentTarget.value
    });
  };

  const saveTagColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag({
      ...selectedTag,
      bgColor: event.currentTarget.value
    });

    const result = tags.map((tag) => {
      return tag.id === selectedTag.id
        ? { ...selectedTag, bgColor: event.currentTarget.value }
        : tag;
    });
    queryClient.setQueryData(['tags'], () => result);
  };

  const saveTagName = () => {
    const result = tags.map((tag) => {
      return tag.id === selectedTag.id ? selectedTag : tag;
    });
    queryClient.setQueryData(['tags'], () => result);

    toast({
      title: '태그 이름이 수정되었습니다.'
    });
  };

  const deleteTag = (id: number) => {
    const result = tags.filter((tag) => tag.id !== id);
    queryClient.setQueryData(['tags'], () => result);
    setIsOpenEditor(false);
    toast({
      title: '태그가 삭제되었습니다.'
    });
  };

  return (
    <div>
      <div className="min-h-[200px]">
        <header className="flex justify-between gap-2">
          <h3 className="font-bold">적용 태그</h3>
          <TagDeleteButton deleteTag={() => resetTags(bid)}>
            <Button>태그 초기화</Button>
          </TagDeleteButton>
        </header>

        <ul className="flex flex-wrap gap-[4px] mt-[20px]">
          {generatedTags.map(({ id, text, bgColor }) => (
            <li
              key={id}
              style={{ background: bgColor }}
              className="flex justify-between items-center basis-[150px] rounded-[4px] px-[10px] h-[30px] text-white text-[12px] cursor-pointer"
            >
              {text}
              <TagDeleteButton deleteTag={() => deleteAppliedTags(bid, id)}>
                <button className="p-[5px]">
                  <X size={10} color="#ffffff" strokeWidth={1.25} />
                </button>
              </TagDeleteButton>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-h-[200px]">
        <header className="flex justify-between gap-2">
          <h3 className="font-bold">전체 태그</h3>
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
              <Input value={selectedTag.text} onChange={changeTagName} />
              <Input type="color" className="w-[40px] p-0" onChange={saveTagColor} />
            </div>
            <div className="flex items-align gap-[4px]">
              <Button onClick={() => saveTagName()}>태그 수정</Button>
              <TagDeleteButton deleteTag={() => deleteTag(selectedTag.id)} />
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
              onClick={() => applyTag(bid, id)}
            >
              {text}
              <button className="p-[5px]" onClick={openTagEditor(id)}>
                <Pencil size={10} color="#ffffff" strokeWidth={1.25} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TagDeleteButton({
  children,
  deleteTag
}: {
  children?: ReactNode;
  deleteTag: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children || <Button variant="destructive">태그 삭제</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제된 태그는 복구할 수 없어요! 정말 삭제하시겠어요?</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => deleteTag()}>예</AlertDialogAction>
          <AlertDialogCancel>아니오</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteButton({
  id,
  deleteFavorite // TODO: Prop Drilling이 심함. 개선 필요
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
          <AlertDialogTitle>선택된 프로젝트를 관심 목록에서 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteFavorite(id)}>삭제하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
