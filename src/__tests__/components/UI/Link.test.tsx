import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { LinkButton } from 'renderer/components/UI/Link';

const renderComponent = (props: any) => {
  return render(<LinkButton {...props} />);
};

describe('Link', () => {
  it('should render', () => {
    expect(
      renderComponent({
        to: '/',
      })
    ).toBeTruthy();
  });

  it('should render with text', () => {
    const { getByText } = renderComponent({
      to: '/',
      text: 'Home',
    });

    expect(getByText('Home:')).toBeInTheDocument();
  });

  it('should click on link', () => {
    const onClick = jest.fn();
    const { getByText } = renderComponent({
      to: '/',
      urlText: 'Home',
      text: 'Home',
      onClick,
    });

    getByText('@Home').click();
    expect(onClick).toHaveBeenCalled();
  });
});
