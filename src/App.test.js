import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cat adoption title', () => {
  render(<App />);
  const heading = screen.getByText(/cat adoption center/i);
  expect(heading).toBeInTheDocument();
});
