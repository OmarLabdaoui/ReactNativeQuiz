import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import data from "./data"
const initialState = {
    ansewers: [data],


}
const ansewerslice = createSlice({
    name: "answers",
    initialState,
    reducers: {
        getQuestions: (state, action) => {

            state.ansewers.push(action.payload)

        },
    },

})

export default ansewerslice.reducer
export const { displaycat } = ansewerslice.actions
export const selectAnswers = (state) => state.ansewers
