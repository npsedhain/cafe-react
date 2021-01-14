import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';

import App from '../App';

test('renders cafe react header', () => {
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
  );
  const linkElement = screen.getByText(/Cafe React/i);
  expect(linkElement).toBeInTheDocument();
});
