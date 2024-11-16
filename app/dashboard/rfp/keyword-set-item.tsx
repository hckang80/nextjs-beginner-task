"use client";

import { KeywordSet } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleMinus, Pin } from "lucide-react";

export function KeywordSetItem({
  item: { id, name },
  deleteItem,
  handler,
}: {
  item: KeywordSet;
  deleteItem: (id: number) => void;
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
        <Button variant="ghost" onClick={() => deleteItem(id)}>
          <CircleMinus color="#f00" />
        </Button>
      </div>
    </li>
  );
}
