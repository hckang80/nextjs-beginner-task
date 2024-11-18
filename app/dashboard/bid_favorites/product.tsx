import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnnouncementContext, suggestedStates, toReadableDate } from "@/lib";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Product({ product }: { product: AnnouncementContext }) {
  const { id, name, price, type, source, createAt, endAt } = product;

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
        <td>{name}</td>
        <td>{price}</td>
        <td>{type}</td>
        <td>{source}</td>
        <td>{toReadableDate(createAt)}</td>
        <td>{toReadableDate(endAt)}</td>
      </tr>
      <tr>
        <td colSpan={8}>
          <div className="flex justify-between gap-2">
            <button>
              <Pencil size={16} />
            </button>
            <dl>
              <div>
                <dt>담당</dt>
                <dd>과제클라이원트</dd>
              </div>
              <div>
                <dt>제안상태</dt>
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
              <div>
                <dt>비고</dt>
                <dd>
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
    </tbody>
  );
}
