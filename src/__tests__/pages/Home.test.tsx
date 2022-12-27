import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TweetsProvider } from 'renderer/components/Tweets/TweetsContext';
import { Home } from 'renderer/pages/Home';

jest.mock('renderer/api/twitter', () => ({
  fetchTweetsByUserId: jest.fn(),
}));

jest.mock('renderer/components/Tweets/TweetPosts', () => ({
  TweetPosts: () => <div>Tweet</div>,
}));

const renderComponent = (props?: any) => {
  return render(
    <TweetsProvider {...props}>
      <Home />
    </TweetsProvider>
  );
};

describe('Home', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });

  it('should render tweets', () => {
    const { getByText } = renderComponent({
      value: {
        tweets: [
          {
            id: '1',
            text: 'Tweet 1',
            created_at: '2021-01-01',
          },
        ],
      },
    });

    expect(getByText('Search a user to get tweets')).toBeTruthy();
  });

  it('should click on get more tweets', () => {
    let setLoading = jest.fn();
    const { getByText } = renderComponent({
      value: {
        tweets: [
          {
            id: '1',
            text: 'Tweet 1',
            created_at: '2021-01-01',
          },
        ],
        currentProfileSearch: {
          id: '1',
          name: 'User 1',
          username: 'user1',
        },
        setLoading,
      },
    });

    getByText('Get more tweets').click();
    expect(setLoading).toBeCalledWith(true);
  });

  it('should not allow to fetch if there is no currentProfileSearch', () => {
    let setLoading = jest.fn();
    const { getByText } = renderComponent({
      value: {
        tweets: [
          {
            id: '1',
            text: 'Tweet 1',
            created_at: '2021-01-01',
          },
        ],
        setLoading,
      },
    });

    //click on get more tweets
    getByText('Get more tweets').click();
    expect(setLoading).not.toBeCalled();
  });

  it('should render loading', () => {
    const { getByText } = renderComponent({
      value: {
        tweets: [],
        isLoading: true,
      },
    });

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render user without tweets', () => {
    const { getByText } = renderComponent({
      value: {
        tweets: [],
        currentProfileSearch: {
          id: '1',
          name: 'User 1',
          username: 'user1',
        },
      },
    });

    expect(getByText('User without tweets')).toBeInTheDocument();
  });
});
