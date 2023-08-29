import { createSlice } from "@reduxjs/toolkit";

const localStorge = window.localStorage;

let resultsState;

if (localStorge.getItem('results') !== null) {
    resultsState = JSON.parse(localStorge.getItem('results'));
} else {
    resultsState = [];
}

const resultsSlice = createSlice({
    name: 'resultsSlice',
    initialState: resultsState,
    reducers: {
        addResult: (state, action) => {
            state.push(action.payload);
            localStorge.setItem('results', JSON.stringify(state));
        }
    }
})

export const { addResult } = resultsSlice.actions
export default resultsSlice.reducer;
