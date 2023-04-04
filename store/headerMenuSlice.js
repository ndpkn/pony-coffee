import { createSlice } from "@reduxjs/toolkit";

export const headerMenuSlice= createSlice({
    name:"headerMenu",
    initialState:{
        headerMenuItems: [],
        loading: true,
        error: false,
        notifCounter: null
    },
    reducers:{
        setHeaderMenu: (state, action) => {
            state.headerMenuItems = action.payload
        },
        setHeaderMenuLoading: (state, action) => {
            state.loading = action.payload
        },
        setHeaderMenuError: (state, action) => {
            state.error = action.payload
        },
        setNotifCounter: (state, action) => {
            state.notifCounter = action.payload
        }
    }
})

export const { setHeaderMenu, setHeaderMenuLoading, setHeaderMenuError, setNotifCounter } = headerMenuSlice.actions

export default headerMenuSlice.reducer