"use client";

import { KeywordSet } from "@/app/lib/db";
import { Input } from "@/components/ui/input";
import { CircleMinus, Pin } from "lucide-react";

export function KeywordSetItem({
  item: { id, name },
  handler,
}: {
  item: KeywordSet;
  handler: (id: number) => (event: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <li className="flex items-center gap-2">
      <div>
        <Pin color="hsl(var(--border))" />
      </div>
      <div className="grow">
        <Input value={name} onChange={handler(id)} />
      </div>
      <div>
        <CircleMinus color="#f00" />
      </div>
    </li>
  );
}
