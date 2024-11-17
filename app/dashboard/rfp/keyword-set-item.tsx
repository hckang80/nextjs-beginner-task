"use client";

import type { KeywordSet } from "@/lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleMinus, Pin } from "lucide-react";

export function KeywordSetItem({
  item: { id, name, isPined },
  pinItem,
  deleteItem,
  handler,
}: {
  item: KeywordSet;
  pinItem: (id: number) => void;
  deleteItem: (id: number) => void;
  handler: (id: number) => (event: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <li className="flex items-center gap-2">
      <div>
        <Button variant="ghost" onClick={() => pinItem(id)}>
          <Pin {...(isPined ? {} : { color: "hsl(var(--border))" })} />
        </Button>
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
