import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

jest.mock('../renderer/components/Layout/Layout', () => ({
  Layout: () => <div>Layout</div>,
}));

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
