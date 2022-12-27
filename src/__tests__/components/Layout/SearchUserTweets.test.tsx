import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { SearchUserTweets } from 'renderer/components/Layout/SearchUserTweets';
import { TweetsProvider } from 'renderer/components/Tweets/TweetsContext';

jest.mock('renderer/api/twitter', () => ({
  fetchTweetsByUsername: jest.fn(),
}));

const renderComponent = (contextProps?: any) => {
  return render(
    <TweetsProvider {...contextProps}>
      <SearchUserTweets />
    </TweetsProvider>
  );
};

describe('SearchUserTweets', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });

  it('should render search by click the button', () => {
    const clearTweets = jest.fn();
    const { getByTestId } = renderComponent({
      value: {
        clearTweets,
      },
    });
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: '23' } });

    const searchButton = getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(clearTweets).toHaveBeenCalled();
  });

  it('should not search if input is empty', () => {
    const clearTweets = jest.fn();
    const { getByTestId, getByText } = renderComponent({
      value: {
        clearTweets,
      },
    });
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: '' } });

    const searchButton = getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(clearTweets).not.toHaveBeenCalled();
    expect(getByText('Please enter a username')).toBeInTheDocument();
  });

  it('should search by hitting enter', () => {
    const clearTweets = jest.fn();
    const { getByTestId } = renderComponent({
      value: {
        clearTweets,
      },
    });
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(clearTweets).toHaveBeenCalled();
  });
});
