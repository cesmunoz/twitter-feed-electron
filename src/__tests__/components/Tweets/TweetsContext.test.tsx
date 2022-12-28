import '@testing-library/jest-dom';
import { act, render, renderHook } from '@testing-library/react';
import {
  TweetsProvider,
  useTweets,
} from 'renderer/components/Tweets/TweetsContext';

type TestComponentProps = {
  tweetsToAdd?: any;
  historyToAdd?: any;
};

const TestComponentContainer = ({
  tweetsToAdd,
  historyToAdd,
}: TestComponentProps) => (
  <TweetsProvider>
    <TestComponent tweetsToAdd={tweetsToAdd} historyToAdd={historyToAdd} />
  </TweetsProvider>
);

const TestComponent = ({ tweetsToAdd, historyToAdd }: TestComponentProps) => {
  const {
    isLoading,
    tweets,
    history,
    profiles,
    meta,
    currentProfileSearch,
    dispatch,
    addTweets,
    addProfile,
    clearTweets,
    saveHistory,
    setCurrentProfileSearch,
    setLoading,
  } = useTweets();

  return (
    <TweetsProvider>
      <button onClick={() => addTweets(tweetsToAdd || [])}>Add Tweets</button>
      <button
        onClick={() =>
          addProfile({
            id: '123',
            username: 'test',
            profile_image_url: 'test',
            name: 'test',
          })
        }
      >
        Add Profile
      </button>
      <button onClick={() => clearTweets()}>Clear Tweets</button>
      <button onClick={() => saveHistory(historyToAdd || 'test1')}>
        Save History
      </button>
      <button onClick={() => setCurrentProfileSearch('test')}>
        Set Current Profile Search
      </button>
      <button onClick={() => setLoading(true)}>Set Loading</button>
      <button onClick={() => dispatch({ type: 'test' })}>Dispatch</button>
      <div data-testid="isLoading">{isLoading.toString()}</div>
      <div data-testid="tweets">{JSON.stringify(tweets)}</div>
      <div data-testid="history">{JSON.stringify(history)}</div>
      <div data-testid="profiles">{JSON.stringify(profiles)}</div>
      <div data-testid="meta">{JSON.stringify(meta)}</div>
      <div data-testid="currentProfileSearch">
        {JSON.stringify(currentProfileSearch)}
      </div>
    </TweetsProvider>
  );
};

describe('TweetContext', () => {
  it('should render', () => {
    const { getByText } = render(<TestComponentContainer />);
    expect(getByText('Add Tweets')).toBeInTheDocument();
  });

  it('should call dispatch of actions', () => {
    const { getByText, getByTestId } = render(<TestComponentContainer />);
    act(() => {
      getByText('Set Loading').click();
      getByText('Add Tweets').click();
      getByText('Add Profile').click();
      getByText('Clear Tweets').click();
      getByText('Save History').click();
      getByText('Set Current Profile Search').click();
    });

    expect(getByTestId('isLoading')).toHaveTextContent('true');
    expect(getByTestId('tweets')).toHaveTextContent('[]');
    expect(getByTestId('history')).toHaveTextContent('test1');
    expect(getByTestId('profiles')).toHaveTextContent(
      '{"test":{"id":"123","username":"test","profile_image_url":"test","name":"test"}}'
    );
    expect(getByTestId('meta')).toHaveTextContent('{}');
    expect(getByTestId('currentProfileSearch')).toHaveTextContent(
      '{"id":"123","username":"test","profile_image_url":"test","name":"test"}'
    );
  });

  it('throw an error when dispatch is called with an invalid action', () => {
    const { getByText } = render(<TestComponentContainer />);
    try {
      act(() => {
        getByText('Dispatch').click();
      });
    } catch (error) {
      expect(error).toEqual(new Error('Unhandled action type: test'));
    }
  });

  it("should throw an error when useTweets isn't wrapped in TweetsProvider", () => {
    try {
      renderHook(() => useTweets());
    } catch (error) {
      expect(error).toEqual(
        new Error('useTweets must be used within a TweetsProvider')
      );
    }
  });

  it('should add tweets', () => {
    const { getByText, getByTestId } = render(
      <TestComponentContainer
        tweetsToAdd={{
          data: [
            {
              id: '123',
              text: 'test',
              created_at: 'test',
            },
          ],
          meta: {
            newest_id: '123',
            oldest_id: '123',
            result_count: 1,
            next_token: 'test',
          },
        }}
      />
    );
    act(() => {
      getByText('Add Tweets').click();
    });
    expect(getByTestId('tweets')).toHaveTextContent(
      '[{"id":"123","text":"test","created_at":"test"}]'
    );
  });

  it('should save history array if exists', () => {
    const { getByText, getByTestId } = render(
      <TestComponentContainer historyToAdd={['test1', 'test2']} />
    );
    act(() => {
      getByText('Save History').click();
    });
    expect(getByTestId('history')).toHaveTextContent('["test1","test2"]');
  });

  it("should add null to profile if profile doesn't exist", () => {
    const { getByText, getByTestId } = render(<TestComponentContainer />);
    act(() => {
      getByText('Set Current Profile Search').click();
    });
    expect(getByTestId('profiles')).toHaveTextContent('');
  });
});
