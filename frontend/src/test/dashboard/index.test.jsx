import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

describe('Dashboard', () => {
  test('renders the component', () => {
    render(
            <MemoryRouter initialEntries={['/dashboard']} >
                <Dashboard />
            </MemoryRouter>
    );
    // check the add game button
    expect(screen.getByText(/\+ add a game!/i)).toBeInTheDocument();

    // there is a list
    expect(screen.getByRole('list')).toBeInTheDocument();

    // there no data then show a icon
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
