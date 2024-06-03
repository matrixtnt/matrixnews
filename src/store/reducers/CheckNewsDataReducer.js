// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

// Initial state with some default data
const initialState = {
  data: {
    isLiveNewsData: false,// Set the default value as needed
    isBreakingNewsData: false,
    isLiveNewsApiCallOnce: false,
    isBreakingNewsApiCallOnce: false,
  }
}

// Create a Redux slice
export const checkNewsDataSlice = createSlice({
  name: 'checkNewsData',
  initialState,
  reducers: {
    checkLiveNewsData: (state, action) => {
      const { liveNewsDataFound,liveNewsData } = action.payload.data
      state.data.isLiveNewsData = liveNewsDataFound
      state.data.liveNewsData = liveNewsData
      // console.log("In reducer-> ",action.payload.data)
    },
    checkBreakingNewsData: (state, action) => {
      const { breakingNewsDataFound,breakingNewsData  } = action.payload.data
      // console.log("In reducer-> ",action.payload.data)
      state.data.isBreakingNewsData = breakingNewsDataFound
      state.data.breakingNewsData = breakingNewsData
    }
  }
})

// Export the categoryCount reducer and action
export const { checkLiveNewsData,checkBreakingNewsData } = checkNewsDataSlice.actions
export default checkNewsDataSlice.reducer

// Function to load category count data
export const checkLiveNewsDataFound = data => {
  store.dispatch(checkLiveNewsData({ data }))
}
export const checkBreakingNewsDataFound = data => {
  store.dispatch(checkBreakingNewsData({ data }))
}

// Selector function to get tempdata from the state
export const checkNewsDataSelector = state => state.checkNewsData

// Selector function to get categoryCount from the state
export const liveNewsDataSelector = createSelector(checkNewsDataSelector, checkNewsData => checkNewsData.data.isLiveNewsData)
export const breakingNewsDataSelector = createSelector(checkNewsDataSelector, checkNewsData => checkNewsData.data.isBreakingNewsData)
