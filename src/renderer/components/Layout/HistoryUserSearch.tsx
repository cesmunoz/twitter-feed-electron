import { useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchTweetsByUserId,
  fetchTweetsByUsername,
} from 'renderer/api/twitter';
import { useLocalStorage } from 'renderer/utils/useLocalStorage';
import { STORAGE_KEYS } from '../../../constants';
import { useTweets } from '../Tweets/TweetsContext';
import { Button } from '../UI/Button';

export const HistoryUserSearch = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const {
    history,
    profiles,
    saveHistory,
    clearTweets,
    setCurrentProfileSearch,
    setLoading,
  } = useTweets();

  const [searchedUsers] = useLocalStorage(STORAGE_KEYS.USERS_SEARCHED, []);

  useEffect(() => {
    if (!history.length && searchedUsers?.length) {
      saveHistory(searchedUsers as string[]);
    }
  }, [searchedUsers, saveHistory, history]);

  const handleSearchByUserId = (username: string) => {
    const profile = profiles && profiles[username as any];
    clearTweets();
    setLoading(true);
    if (!profile) {
      fetchTweetsByUsername(username);
    } else {
      fetchTweetsByUserId(profile?.id);
    }

    setCurrentProfileSearch(username);

    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="max-w-sm rounded-lg bg-blue-900 overflow-hidden shadow-lg m-4 mr-20">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
            History user search
          </h2>
        </div>
        <div className="flex-1 px-4 py-2 m-2">
          <FaHistory className="h-6 w-6 text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right" />
        </div>
      </div>
      {history.map((item, index) => (
        <div key={item}>
          <hr className="border-white-600" />
          <div className="flex">
            <div className="flex my-3">
              <p className="pl-4 ml-2 w-2 text-gray-400">{index + 1}.</p>
              <Button
                className="px-4 ml-2 font-bold text-white cursor-pointer"
                onClick={() => handleSearchByUserId(item)}
              >
                {item}
              </Button>
            </div>
          </div>
          <hr className="border-gray-600" />
        </div>
      ))}
    </div>
  );
};
