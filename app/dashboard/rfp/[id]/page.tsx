"use client";

import { useParams } from "next/navigation";

export default function RfpDetail() {
  const params = useParams<{ id: string }>();

  return <div>{params.id}</div>;
}
