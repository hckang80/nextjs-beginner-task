"use client";

import { CircleMinus, Pin } from "lucide-react";

export function KeywordSet({
  item: { name },
}: {
  item: { id: number; name: string; isPrivate: boolean };
}) {
  return (
    <li className="flex items-center gap-2">
      <div>
        <Pin color="hsl(var(--border))" />
      </div>
      <div className="grow">{/* <Input value={name} /> */}</div>
      <div>
        <CircleMinus color="#f00" />
      </div>
    </li>
  );
}
