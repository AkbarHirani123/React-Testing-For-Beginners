import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {
    const {debug, getByTestId} = render(<Counter />);
    
    // debug();
    const counterButton = getByTestId('counter-button');

    // asserts text value 0 is found within a button
    // expect(getByText('0').tagName).toBe('BUTTON');

    // asserts counter-button is a button
    expect(counterButton.tagName).toBe('BUTTON');
    expect(counterButton.textContent).toBe('0');

    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe('1');
    
    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe('2');

    // debug();
})