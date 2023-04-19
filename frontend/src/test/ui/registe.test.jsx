import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/sign';

describe('Test Registe logic ', () => {
  test('renders the component', () => {
    render(
            <MemoryRouter initialEntries={['/login']} >
                <Login />
            </MemoryRouter>
    );
    const nameInput = document.querySelector('#signUpUsername')
    const emailInput = document.querySelector('#signUpUsername')
    const passwordInput = document.querySelector('#signUpPassword')
    const confirmPasswordInput = document.querySelector('#signUpConfirmPassword')
  
    // Simulated user input
    fireEvent.change(nameInput, { target: { value: 'test' } })
    fireEvent.change(emailInput, { target: { value: 'test@email.com'} })
    fireEvent.change(passwordInput, { target: { value: 'test123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'test123' } })
    // Simulated user click
    const resgiterButton = document.querySelector('#login-box > div:nth-child(1) > form > button')
    fireEvent.click(resgiterButton)

    // waiting for the success message
    // const successMessage = await screen.findByText('Register success!')
    // expect(successMessage).toBeInTheDocument()
    // screen.logTestingPlaygroundURL();
  });
});
