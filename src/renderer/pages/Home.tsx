import { fetchTweetsByUserId } from '../api/twitter';
import { TweetPosts } from '../components/Tweets/TweetPosts';
import { useTweets } from '../components/Tweets/TweetsContext';
import { Button } from '../components/UI/Button';

export const Home = () => {
  const { tweets, meta, currentProfileSearch, isLoading, setLoading } =
    useTweets();

  const getMoreTweets = () => {
    if (!currentProfileSearch) {
      return;
    }
    setLoading(true);
    fetchTweetsByUserId(currentProfileSearch.id, meta);
  };

  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-white">
            {!currentProfileSearch
              ? 'Search a user to get tweets'
              : `Feed by ${currentProfileSearch.name} (@${currentProfileSearch.username})`}
          </h2>
        </div>
      </div>
      {!isLoading && tweets.length === 0 && currentProfileSearch && (
        <div className="flex justify-center mb-3">
          <p className="text-white">User without tweets</p>
        </div>
      )}
      {tweets.map((tweet) => (
        <TweetPosts key={tweet.id} tweet={tweet} />
      ))}
      {isLoading && (
        <div className="flex justify-center mb-3">
          <p className="text-white">Loading...</p>
        </div>
      )}
      {tweets.length > 0 && (
        <div className="flex justify-center mb-3">
          <Button onClick={getMoreTweets}>Get more tweets</Button>
        </div>
      )}
    </div>
  );
};
