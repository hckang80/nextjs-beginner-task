import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChannelSearch() {
  return (
    <table className="search-table">
      <tbody>
        <tr>
          <th>채널</th>
          <td>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Input
                  className="w-[300px]"
                  placeholder="채널을 검색해서 추가해보세요"
                />
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                채널 전부 보기
              </label>

              <Button type="button" variant="secondary" className="ml-auto">
                채널 목록
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
