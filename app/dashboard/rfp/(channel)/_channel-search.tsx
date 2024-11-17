import { ChannelSearchHead } from "./channel-search-head";
import { ChannelSearchList } from "./channel-search-list";

export function ChannelSearch() {
  return (
    <table className="search-table">
      <tbody>
        <ChannelSearchHead />
        <ChannelSearchList />
      </tbody>
    </table>
  );
}
