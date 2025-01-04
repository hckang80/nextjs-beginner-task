import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib';
import { Dispatch, SetStateAction } from 'react';

export function ToggleController({
  className = '',
  data,
  handler
}: {
  className?: string;
  data: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="shrink-0">공용</span>
      <Switch title="공용/개인 토글" checked={data} onCheckedChange={handler} />
      <span className="shrink-0">개인</span>
    </div>
  );
}
