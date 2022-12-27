import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { fetchTweetsByUsername } from 'renderer/api/twitter';
import { useTweets } from '../Tweets/TweetsContext';
import { Button } from '../UI/Button';

export const SearchUserTweets = () => {
  const [tweeterUsername, setTweeterUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { clearTweets } = useTweets();

  const handleSearch = () => {
    if (!tweeterUsername) {
      setError('Please enter a username');
      return;
    }

    clearTweets();
    fetchTweetsByUsername(tweeterUsername);
    setTweeterUsername('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTweeterUsername(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className=" text-gray-300 w-80 p-5 pb-0 mr-16">
      <button type="submit" className="absolute ml-4 mt-3 mr-4">
        <FaSearch className="h-5 w-5" />
      </button>
      <input
        data-testid="search-input"
        type="search"
        name="search"
        placeholder="Search Twitter Feed by username"
        value={tweeterUsername}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="h-10 px-10 pr-2 w-full rounded-full text-sm  bg-purple-white shadow rounded border-0 text-black focus:outline-none"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button data-testid="search-button" onClick={handleSearch}>
        Search Feed
      </Button>
    </div>
  );
};
