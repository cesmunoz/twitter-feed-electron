import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { NavBar } from 'renderer/components/Layout/NavBar';

const renderComponent = () => {
  return render(
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  );
};

describe('NavBar', () => {
  it('should render', () => {
    expect(renderComponent()).toBeTruthy();
  });
});
