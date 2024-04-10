// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

// Initial state with some default data
const initialState = {
    data: []
}

// Create a Redux slice
export const catNavSlice = createSlice({
    name: 'catNavData',
    initialState,
    reducers: {
        setCatNavData: (state, action) => {
            const { data } = action.payload.data
            // console.log("In reducer-> ",action.payload.data)
            state.data = data
        }
    }
})

export const { setCatNavData } = catNavSlice.actions
export default catNavSlice.reducer


export const loadCatNavData = data => {
    store.dispatch(setCatNavData({ data }))
}

export const catNavSelector = state => state.catNavData

export const catNavDataSelector = createSelector(catNavSelector, catNavData => catNavData.data)
