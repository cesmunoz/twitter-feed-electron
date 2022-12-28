import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ReadMe } from 'renderer/pages/ReadMe';

describe('ReadMe', () => {
  it('should render', () => {
    expect(render(<ReadMe />)).toBeTruthy();
  });
});
