// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

// Initial state with some default data
const initialState = {
  data: {
    categoryCount: 0 // Set the default value as needed
  }
}

// Create a Redux slice
export const tempdataSlice = createSlice({
  name: 'tempdata',
  initialState,
  reducers: {
    categoryCount: (state, action) => {
      const { categoryCount } = action.payload.data
      state.data.categoryCount = categoryCount
    }
  }
})

// Export the categoryCount reducer and action
export const { categoryCount } = tempdataSlice.actions
export default tempdataSlice.reducer

// Function to load category count data
export const loadCategoryCount = data => {
  store.dispatch(categoryCount({ data }))
}

// Selector function to get tempdata from the state
export const tempdataSelector = state => state.tempdata

// Selector function to get categoryCount from the state
export const categoryCountSelector = createSelector(tempdataSelector, tempdata => tempdata.data.categoryCount)
