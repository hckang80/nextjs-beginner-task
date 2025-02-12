import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { KeywordSet, generatedId } from '@/lib';
import { useQueryClient } from '@tanstack/react-query';
import { Settings, Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { KeywordSetItem } from './keyword-set-item';
import { ToggleController } from './toggle-controller';

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
        <Button variant="ghost" title="키워드세트 관리">
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
