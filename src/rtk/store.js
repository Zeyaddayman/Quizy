import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./reducers/questionsSlice";
import userInfoSlice from "./reducers/userInfoSlice";
import resultsSlice from "./reducers/resultsSlice";

export const store = configureStore({
    reducer: {
        questions: questionsSlice,
        userInfo: userInfoSlice,
        results: resultsSlice,
    }
})