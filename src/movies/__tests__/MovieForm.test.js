import React from 'react';
import { render, cleanup, fireEvent, getByText } from 'react-testing-library';
import MovieForm from '../MovieForm';

afterEach(cleanup);

// Spy/mock Function - to pass in the form as a submit prop
// This couold've been an API call
const onSubmit = jest.fn();

test('<MovieForm />', () => {
    const { queryByTestId, getByText, getByLabelText } = render(
        <MovieForm submitForm={onSubmit}/>
    );

    expect(queryByTestId('movie-form')).toBeTruthy();
    // console.log(getByLabelText('Text').outerHTML);

// this first line doesn't update value of input by itself
// getByLabelText('Text').value = 'hello';
// this change event line is needed
// fireEvent.change(getByLabelText('Text'));

    // Use this instead
    fireEvent.change(getByLabelText('Text'), {
        target: { value: 'hello'},
    })
    
    fireEvent.click(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
        text: 'hello',
    });
})