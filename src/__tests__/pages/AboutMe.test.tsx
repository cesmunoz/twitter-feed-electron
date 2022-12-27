import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AboutMe } from 'renderer/pages/AboutMe';
import { shell } from 'electron';

jest.mock('electron', () => ({
  shell: {
    openExternal: jest.fn(),
  },
}));

describe('App', () => {
  it('should render', () => {
    expect(render(<AboutMe />)).toBeTruthy();
  });

  it('should click on Link', () => {
    const { getByText } = render(<AboutMe />);
    getByText('@cesmunoz').click();
    expect(shell.openExternal).toHaveBeenCalled();
  });
});
