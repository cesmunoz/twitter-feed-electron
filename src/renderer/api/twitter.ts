import { ipcRenderer } from 'electron';
import { TweetMetaType } from '../components/Tweets/TweetsContext';
import { EVENT_CALL_NAME } from '../../constants';

type TwitterUserPayloadType = {
  meta?: TweetMetaType;
  username?: string;
  userId?: string;
};

const fetchTweetsByUser = async (payload: TwitterUserPayloadType) =>
  ipcRenderer.send(EVENT_CALL_NAME.SEARCH_TWEETS_BY_USERNAME, payload);

export const fetchTweetsByUsername = async (username: string) => {
  fetchTweetsByUser({ username });
};

export const fetchTweetsByUserId = async (
  userId: string,
  meta?: TweetMetaType
) => {
  fetchTweetsByUser({ userId, meta });
};
