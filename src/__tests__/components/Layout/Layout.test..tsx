import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Layout } from 'renderer/components/Layout/Layout';
import { TweetsProvider } from 'renderer/components/Tweets/TweetsContext';

jest.mock('renderer/components/Layout/SearchContainer', () => ({
  SearchContainer: () => <div>SearchContainer</div>,
}));

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
    removeAllListeners: jest.fn(),
    on: jest.fn(),
  },
}));

const renderComponent = (contextProps?: any) => {
  return render(
    <TweetsProvider {...contextProps}>
      <Layout />
    </TweetsProvider>
  );
};

describe('Layout', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });
});
