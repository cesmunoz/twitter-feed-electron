import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from 'renderer/components/UI/Button';

const renderComponent = () => {
  return render(<Button onClick={() => {}}>test</Button>);
};

describe('Button', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });
});
