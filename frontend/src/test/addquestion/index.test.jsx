import React from 'react';
import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Question from '../../components/Question';



describe('addQuestion', () => {
    test('renders the component', () => {
        render(
            <MemoryRouter initialEntries={['/addQuestion']} >
                <Question />
            </MemoryRouter>
        );       
        // check the title
        expect(screen.getByRole('heading', {
            name: /add a new question for quiz:/i
          })).toBeInTheDocument();
        // check the question input
        expect(screen.getByRole('textbox', {
            name: /question description/i
          })).toBeInTheDocument();
        // check the answer input
        expect(screen.getByRole('textbox', {
            name: /answer 1/i
          })).toBeInTheDocument();
        // check the submit button
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
        // screen.logTestingPlaygroundURL();
    });
});