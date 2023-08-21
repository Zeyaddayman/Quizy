import { createSlice } from "@reduxjs/toolkit";

const userState = {
    info: {
        username: 'Unknown',
    },
    answers: [],
    result: {}
}

const userInfoSlice = createSlice({
    name: 'userInfoSlice',
    initialState: userState,
    reducers: {
        clearUserAnswers: (state) => {
            state.answers = [];
        },
        saveUserAnswer: (state, action) => {
            let index = Number(action.payload.id) - 1;
            state.answers[index] = action.payload;
        },
        saveUserResult: (state, action) => {
            state.result = action.payload;
        },
        changeUsername: (state, action) => {
            state.info.username = action.payload;
        }
    }
})

export const { saveUserAnswer, saveUserResult, changeUsername, clearUserAnswers } = userInfoSlice.actions
export default userInfoSlice.reducer;
