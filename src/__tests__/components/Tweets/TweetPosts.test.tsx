import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TweetPosts } from 'renderer/components/Tweets/TweetPosts';
import { TweetsProvider } from 'renderer/components/Tweets/TweetsContext';

const renderComponent = (contextProps?: any, componentProps?: any) => {
  return render(
    <TweetsProvider {...contextProps}>
      <TweetPosts {...componentProps} />
    </TweetsProvider>
  );
};

describe('TweetPosts', () => {
  it('should render', () => {
    expect(
      renderComponent(
        {
          value: {
            currentProfileSearch: {
              name: 'test',
              username: 'test',
              profile_image_url: 'test',
            },
            tweets: [
              {
                id: 'test',
                text: 'test',
                created_at: '2021-01-01',
              },
            ],
          },
        },
        {
          tweet: {
            id: 'test',
            text: 'test',
            created_at: '2021-01-01',
            public_metrics: {
              reply_count: 1,
              retweet_count: 1,
              like_count: 1,
              quote_count: 1,
            },
          },
        }
      )
    ).toBeTruthy();
  });
});
