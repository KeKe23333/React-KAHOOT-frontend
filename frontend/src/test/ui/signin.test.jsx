import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/sign';

describe('Test Sign logic ', () => {
  test('renders the component', () => {
    render(
            <MemoryRouter initialEntries={['/login']} >
                <Login />
            </MemoryRouter>
    );
    screen.logTestingPlaygroundURL();
    const emailInput = document.querySelector('#signInEmail')
    const passwordInput = document.querySelector('#signInPassword')
    // Simulated user input
    fireEvent.change(emailInput, { target: { value: 'test@email.com'} })
    fireEvent.change(passwordInput, { target: { value: 'test123' } })
    // Simulated user click
    const signInButton = document.querySelector('#login-box > div:nth-child(2) > form > button')
    fireEvent.click(signInButton)

    // waiting for the success message
    // const successMessage = await screen.findByText('Register success!')
    // expect(successMessage).toBeInTheDocument()

  });
});
