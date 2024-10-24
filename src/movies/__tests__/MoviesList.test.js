import React from 'react';
import { render, cleanup, waitForElement, getByTestId } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../MoviesList';
import { POSTER_PATH } from '../Movie';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

console.error = jest.fn();

const movies = {
    success: true,
    results: [
        {
            id: 'hi',
            title: 'Big Day!',
            poster_path: "kjnsadkjn.jpg"
        },
        {
            id: 'hi2',
            title: 'Big Day2!',
            poster_path: "kjnsadkjn2.jpg"
        },
        {
            id: 'hi3',
            title: 'Big Day3!',
            poster_path: "kjnsadkjn3.jpg"
        }
    ]
}

const movie = movies.results[0];

test('<MoviesList />', async () => {
    fetch.mockResponseOnce(JSON.stringify(movies));
    
    const { debug, getByTestId, getAllByTestId, queryByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>);
    // check for loading = true
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElement(() => getByTestId('movie-link'));
    // check for loading = false
    expect(queryByTestId('loading')).toBeFalsy();
    expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
    // no need to test for everything like below
    expect(getByTestId('movie-img').getAttribute('src')).toBe(POSTER_PATH + movie.poster_path);
    // check the number of items returned from the api
    expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});

test('<MoviesList /> api fail', async () => {
    movies.success = false;
    fetch.mockResponseOnce(JSON.stringify(movies));
    
    const { debug, getByTestId, getAllByTestId, queryByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>);
    // check for loading = true
    expect(getByTestId('loading')).toBeTruthy();
});