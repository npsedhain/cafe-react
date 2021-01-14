import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import MenuHome from '../components/MenuHome';
import { ADD_MENU_ITEM } from '../components/MenuHome/AddMenuItem';

describe('Menu List Tests', () => {
  test('verify that the dialog is rendered properly', () => {
    render(
      <MockedProvider>
        <MenuHome></MenuHome>
      </MockedProvider>
    );

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const dialog = screen.queryByText('Choose Photo');
    expect(dialog).toBeInTheDocument();
  });

  test('verify that the menu item is added when given the right data', async () => {
    const createMenuMutation = { _id: 123, type: 'MAIN COURSE', name: 'Wonderful Dish', price: 10.99 };
    const mocks = [
      {
        request: {
          query: ADD_MENU_ITEM,
          variables: { type: 'MAIN COURSE', name: 'Wonderful Dish', price: 10.99 }
        },
        result: { data: { createMenuMutation } }
      }
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MenuHome></MenuHome>
      </MockedProvider>
    );

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const typeInput = screen.getByTestId('type');
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');

    fireEvent.change(typeInput, { target: { value: 'MAIN COURSE' } });
    fireEvent.change(nameInput, { target: { value: 'Wonderful Dish' } });
    fireEvent.change(priceInput, { target: { value: 10.99 } });

    const submitButton = screen.getByTestId('submit-button');
    await waitFor(() => fireEvent.click(submitButton));

    await waitFor(() => {
      const added = screen.getByDisplayValue('Wonderful Dish');
      expect(added).toBeInTheDocument();
    });
  });
});
