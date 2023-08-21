import { createSlice } from "@reduxjs/toolkit";
import questionsData from './../../assets/questions.json';

const questionsSlice = createSlice({
    name: 'questionsSlice',
    initialState: [],
    reducers: {
        fetchQuestions: () => {
            return questionsData;
        }
    }

})

export const { fetchQuestions } = questionsSlice.actions
export default questionsSlice.reducer;
