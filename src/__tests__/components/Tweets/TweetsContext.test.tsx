import '@testing-library/jest-dom';
import { render, renderHook } from '@testing-library/react';
import {
  TweetsProvider,
  useTweets,
} from 'renderer/components/Tweets/TweetsContext';

const renderComponent = (contextProps?: any) => {
  return render(<TweetsProvider {...contextProps} />);
};

describe('TweetPosts', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });

  it('throw and error on useTweets', () => {
    try {
      renderHook(() => useTweets());
      fail('should throw an error');
    } catch (error) {
      expect(error).toEqual(
        Error('useTweets must be used within a TweetsProvider')
      );
    }
  });
});
