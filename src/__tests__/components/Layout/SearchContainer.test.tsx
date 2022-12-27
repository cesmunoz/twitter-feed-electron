import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SearchContainer } from 'renderer/components/Layout/SearchContainer';

jest.mock('renderer/components/Layout/SearchUserTweets', () => ({
  SearchUserTweets: () => <div>SearchUserTweets</div>,
}));

jest.mock('renderer/components/Layout/HistoryUserSearch', () => ({
  HistoryUserSearch: () => <div>HistoryUserSearch</div>,
}));

const renderComponent = () => {
  return render(<SearchContainer />);
};

describe('SearchContainer', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });
});
