import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

// Errors can be mocked
console.error = jest.fn();

test('<Movie />', () => {
    render(<Movie />);
    expect(console.error).toHaveBeenCalled();
});

const movie = {
    id: "hi",
    title: "Big Day!",
    poster_path: "kjnsadkjn.jpg"
}

test('<Movie /> with movie', () => {
    // MemoryRouter is a Mock Router which is needed if your Link is not surrounded by React Router
    const { getByTestId } = render(
        <MemoryRouter>
            <Movie movie={movie} />
        </MemoryRouter>
    );

    // You must clear/cleanup this console.error spy error becaue it's referencing the previous called value of 'undefined'
    expect(console.error).not.toHaveBeenCalled();
    // You don't wanna make sure react is doing it's job. 
    // You wanna make sure that stuff is doing stuff the user is expecting it to do
    expect(getByTestId('movie-link').getAttribute('href')).toBe("/" + movie.id);
    expect(getByTestId('movie-img').getAttribute('src')).toBe(POSTER_PATH + movie.poster_path);
    
    // ^^ real usability
    
    // debug();

})