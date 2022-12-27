import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { NavLink } from 'renderer/components/UI/NavLink';

jest.mock('react-router-dom', () => ({
  Link: ({ children }: any) => <div>{children}</div>,
}));

const renderComponent = (props: any) => {
  return render(<NavLink {...props} />);
};

describe('NavLink', () => {
  it('should render', () => {
    expect(
      renderComponent({
        to: '/',
        children: 'Home',
        isCurrentLocation: false,
      })
    ).toBeTruthy();
  });
});
