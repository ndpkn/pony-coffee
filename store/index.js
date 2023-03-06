import { configureStore } from '@reduxjs/toolkit' 
import { headerMenuSlice } from './headerMenuSlice'
// import coffeePotsReducer from './coffeePotSlice'


const store = configureStore({
    reducer: {
        [headerMenuSlice.name]: headerMenuSlice.reducer,
        // coffeePots: coffeePotsReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store
