import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function NoteTextarea() {
  const [noteValue, setNoteValue] = useState('');
  const { toast } = useToast();

  const saveNoteValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: 'You submitted the following values:',
      description: noteValue
    });
  };

  return (
    <form onSubmit={saveNoteValue}>
      <Textarea
        placeholder="필요한 메모를 하세요.."
        rows={10}
        value={noteValue}
        onChange={(event) => setNoteValue(event.currentTarget.value)}
      />
      <Button className="w-full mt-[10px]">저장</Button>
    </form>
  );
}
