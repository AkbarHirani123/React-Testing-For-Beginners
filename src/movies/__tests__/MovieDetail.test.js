import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail from '../MovieDetail';

// yarn add jest-fetch-mock
// used to mock a fetch call
global.fetch = require('jest-fetch-mock');

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

const match = {
    params: {
        id: 'jdsfbsdhb',
    }
}

console.error = jest.fn();

const movie = {
    id: 'hi',
    title: 'Big Day!',
}

test('<MovieDetail />', async () => {

    // define your mock fetch response which return the object that is expected as a response to you fetch call
    // but this doesn't doesn't get rendered. You need a wait call.

    /* fetch.mockResponseOnce(JSON.stringify({
        // movie: {
            id: 'hi',
            title: 'Big Day!',
        // }
    })); */

    // ^^ our component was not expecting a movie variable with the value of a movie object.
    // It was infact expecting just a movie object.
    // major real world issue 

    fetch.mockResponseOnce(JSON.stringify(movie));
    
    // ^^ + the test is very brittle because the tests below rely of the data inside the single call

    const { debug, getByTestId } = render(<MovieDetail match={match} />);
    
    // waiting for an element to show up on the page
    await waitForElement(() => getByTestId('movie-title'));

    expect(getByTestId('movie-title').textContent).toBe(movie.title);
    // debug(); 
});