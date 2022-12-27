import { createContext, useContext, useReducer } from 'react';
import { TweetsType, ProfileType } from '../../types/TweetTypes';

const ADD_TWEETS = 'ADD_TWEETS';
const CLEAR_TWEETS = 'CLEAR_TWEETS';
const SAVE_HISTORY = 'SAVE_HISTORY';
const ADD_PROFILE = 'ADD_PROFILE';
const SET_CURRENT_PROFILE_SEARCH = 'SET_CURRENT_PROFILE_SEARCH';
const SET_LOADING = 'SET_LOADING';

type TweetsActionType = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type TweetMetaType = {
  oldest_id?: string;
  newest_id?: string;
  result_count?: number;
  next_token?: string;
};

type TweetsContextType = {
  isLoading: boolean;
  tweets: TweetsType[];
  history: string[];
  profiles: ProfileType[];
  meta: TweetMetaType;
  currentProfileSearch: ProfileType | null;
  addTweets: (tweets: TweetsType[]) => void;
  addProfile: (profile: ProfileType) => void;
  clearTweets: () => void;
  saveHistory: (username: string | string[]) => void;
  setCurrentProfileSearch: (userId: string) => void;
  setLoading: (isLoading: boolean) => void;
};

const initialContext = {
  isLoading: false,
  tweets: [],
  meta: {},
  history: [],
  currentProfileSearch: '',
};

const TweetsContext = createContext(null);
TweetsContext.displayName = 'TweetsContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tweetsReducer(state: any, action: TweetsActionType) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TWEETS:
      return {
        ...state,
        tweets: payload.data ? [...state.tweets, ...payload.data] : [],
        meta: payload.meta,
      };
    case CLEAR_TWEETS:
      return {
        ...state,
        tweets: [],
        meta: {},
      };
    case SAVE_HISTORY: {
      const list = Array.isArray(payload) ? payload : [payload];
      return {
        ...state,
        history: [...new Set([...list, ...state.history])].slice(0, 5),
      };
    }
    case ADD_PROFILE:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [payload.username]: payload,
        },
        currentProfileSearch: payload,
      };
    case SET_CURRENT_PROFILE_SEARCH:
      return {
        ...state,
        currentProfileSearch: state.profiles ? state.profiles[payload] : null,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const useTweets = (): TweetsContextType => {
  const context = useContext(TweetsContext);
  if (!context) {
    throw new Error('useTweets must be used within a TweetsProvider');
  }
  return context;
};

export function TweetsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tweetsReducer, initialContext);

  const addTweets = (tweets: TweetsType[]) =>
    dispatch({ type: ADD_TWEETS, payload: tweets });

  const addProfile = (profile: ProfileType[]) =>
    dispatch({ type: ADD_PROFILE, payload: profile });

  const clearTweets = () => dispatch({ type: CLEAR_TWEETS });

  const saveHistory = (username: string) =>
    dispatch({ type: SAVE_HISTORY, payload: username });

  const setCurrentProfileSearch = (userId: string) =>
    dispatch({ type: SET_CURRENT_PROFILE_SEARCH, payload: userId });

  const setLoading = (isLoading: boolean) =>
    dispatch({ type: SET_LOADING, payload: isLoading });

  const value = {
    ...state,
    addTweets,
    clearTweets,
    saveHistory,
    addProfile,
    setCurrentProfileSearch,
    setLoading,
  };

  return (
    <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>
  );
}
