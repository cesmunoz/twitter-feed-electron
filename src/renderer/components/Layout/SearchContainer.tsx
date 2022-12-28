import { HistoryUserSearch } from './HistoryUserSearch';
import { SearchUserTweets } from './SearchUserTweets';

export const SearchContainer = () => {
  return (
    <div className="w-2/5 h-12 relative">
      <SearchUserTweets />
      <HistoryUserSearch />
    </div>
  );
};
