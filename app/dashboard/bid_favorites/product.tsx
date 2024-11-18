import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnnouncementContext, suggestedStates, toReadableDate } from "@/lib";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Product({
  isVisibleMemo,
  product,
}: {
  isVisibleMemo: boolean;
  product: AnnouncementContext;
}) {
  const { id, name, price, type, source, createdAt, endedAt } = product;

  const router = useRouter();

  const handleRowClick = (row: AnnouncementContext) => {
    router.push(`/dashboard/rfp/${row.id}`);
  };

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
      <tr className="cursor-pointer" onClick={() => handleRowClick(product)}>
        <td>입찰 공고</td>
        <td>{id}</td>
        <td style={{ textAlign: "left" }}>{name}</td>
        <td>{price}</td>
        <td>{type}</td>
        <td>{source}</td>
        <td>{toReadableDate(createdAt)}</td>
        <td>{toReadableDate(endedAt)}</td>
      </tr>
      {isVisibleMemo && (
        <tr>
          <td colSpan={8}>
            <div className="flex justify-between gap-2 px-[20px]">
              <button>
                <Pencil size={16} />
              </button>
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
                      placeholder="Type your message here."
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
