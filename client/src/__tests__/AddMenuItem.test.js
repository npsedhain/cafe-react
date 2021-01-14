import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import AddMenuItem from '../../src/components/MenuHome/AddMenuItem';

describe('Add Menu Item Tests', () => {
  test('verify that error appears when data is not entered', async () => {
    render(
      <MockedProvider>
        <AddMenuItem
          open={true}
          handleClose={() => console.log('hello')}
          menuItem={{ name: 'kitty', type: 'MAIN COURSE', price: 10 }}
        ></AddMenuItem>
      </MockedProvider>
    );

    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: '' } });

    const typeInput = screen.getByTestId('type');
    fireEvent.change(typeInput, { target: { value: '' } });

    const submitButton = screen.getByTestId('submit-button');

    await waitFor(() => fireEvent.click(submitButton));

    const nameError = screen.queryByText('Name is a required field.');
    const typeError = screen.queryByText('Type is a required field.');

    expect(typeError).toBeInTheDocument();
    expect(nameError).toBeInTheDocument();
  });

  test('verify that error disappears when data is entered', async () => {
    render(
      <MockedProvider>
        <AddMenuItem
          open={true}
          handleClose={() => console.log('hello')}
          menuItem={{ name: '', type: '' }}
        ></AddMenuItem>
      </MockedProvider>
    );

    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'Pizza Margherita' } });

    const typeInput = screen.getByTestId('type');
    fireEvent.change(typeInput, { target: { value: 'SIDE DISH' } });

    const submitButton = screen.getByTestId('submit-button');

    await waitFor(() => fireEvent.click(submitButton));

    const nameError = screen.queryByText('Name is a required field.');
    const typeError = screen.queryByText('Type is a required field.');

    expect(typeError).not.toBeInTheDocument();
    expect(nameError).not.toBeInTheDocument();
  });
});
