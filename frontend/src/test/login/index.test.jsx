import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/sign';

describe('Login', () => {
  test('renders the component', () => {
    render(
            <MemoryRouter initialEntries={['/login']} >
                <Login />
            </MemoryRouter>
    );
    // checke login title
    const login = screen.getByText('Sign In');
    expect(login).toBeInTheDocument();
    
    // checkt the register input
    expect(document.querySelector('#signUpUsername')).toBeInTheDocument();
    expect(document.querySelector('#signUpEmail')).toBeInTheDocument();
    expect(document.querySelector('#signUpPassword')).toBeInTheDocument();
    expect(document.querySelector('#signUpConfirmPassword')).toBeInTheDocument();

    //check the login input
    expect(document.querySelector('#signInEmail')).toBeInTheDocument();
    expect(document.querySelector('#signInPassword')).toBeInTheDocument();
    // checke login button
    const register = screen.getByText('REGISTER');
    expect(register).toBeInTheDocument();
    // checke register part
    expect(screen.getByRole('heading', { name: /no account\?/i })).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });
});
