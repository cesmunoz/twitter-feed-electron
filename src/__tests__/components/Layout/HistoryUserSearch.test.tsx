import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { HistoryUserSearch } from 'renderer/components/Layout/HistoryUserSearch';
import { TweetsProvider } from 'renderer/components/Tweets/TweetsContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/history',
  }),
  useNavigate: () => jest.fn(),
}));

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
    removeAllListeners: jest.fn(),
    on: jest.fn(),
  },
}));

jest.mock('renderer/api/twitter', () => ({
  fetchTweetsByUsername: jest.fn(),
  fetchTweetsByUserId: jest.fn(),
}));

jest.mock('renderer/utils/useLocalStorage', () => ({
  useLocalStorage: () => ['user1', 'user2'],
}));

const renderComponent = (contextProps?: any) => {
  return render(
    <TweetsProvider {...contextProps}>
      <HistoryUserSearch />
    </TweetsProvider>
  );
};

describe('SearchUserTweets', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });

  it('should save history', () => {
    const { getByText } = renderComponent({
      value: {
        history: ['user1', 'user2'],
      },
    });
    expect(getByText('user1')).toBeInTheDocument();
  });

  it('should click on user', () => {
    const clearTweets = jest.fn();
    const setCurrentProfileSearch = jest.fn();
    const { getByText } = renderComponent({
      value: {
        history: ['user1', 'user2'],
        setLoading: jest.fn(),
        clearTweets,
        setCurrentProfileSearch,
      },
    });
    fireEvent.click(getByText('user1'));
    expect(clearTweets).toHaveBeenCalled();
    expect(setCurrentProfileSearch).toHaveBeenCalled();
  });

  it('should click on existing fetched user', () => {
    const clearTweets = jest.fn();
    const setCurrentProfileSearch = jest.fn();
    const { getByText } = renderComponent({
      value: {
        history: ['user1', 'user2'],
        profiles: {
          user1: {
            id: '1',
            name: 'user1',
          },
        },
        setLoading: jest.fn(),
        clearTweets,
        setCurrentProfileSearch,
      },
    });
    fireEvent.click(getByText('user1'));
    expect(clearTweets).toHaveBeenCalled();
    expect(setCurrentProfileSearch).toHaveBeenCalled();
  });
});
