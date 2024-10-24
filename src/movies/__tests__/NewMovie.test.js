import React from 'react';
import { render, cleanup, fireEvent, getByText } from 'react-testing-library';
import NewMovie from '../NewMovie';

afterEach(cleanup);

// Integration testing - individual units/components are combined and tested as a group
test('<NewMovie />', () => {
    const { debug, getByTestId, queryByTestId } = render(<NewMovie />);

    // expect(getByTestId('page-title').textContent).toBe('New Movie');
    expect(queryByTestId('page-title').textContent).toBe('New Movie');
    expect(queryByTestId('movie-form')).toBeTruthy();

    // debug();
});

// Snapshot testing - good for checking if a component changed - small assertions
// Take a snapshot of your code after running. You can update with via u
test('<NewMovie />', () => {
    const { debug, getByTestId, queryByTestId, container } = render(<NewMovie />);

    expect(container.firstChild).toMatchSnapshot();
});

test('<Newmovie />', () => {
    const { 
        debug, getByTestId, queryByTestId, container, getByText
    } = render(<NewMovie />);

    fireEvent.click(getByText('Submit'));

})