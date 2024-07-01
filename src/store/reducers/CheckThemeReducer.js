// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

// Initial state with some default data
const initialState = {
    data: {
        isDarkMode: false,
    }
}
// Create a Redux slice
export const checkThemeSlice = createSlice({
    name: 'checkTheme',
    initialState,
    reducers: {
        checkThemeMode: (state, action) => {
            const { isDarkMode } = action.payload.data
            state.data.isDarkMode = isDarkMode;
        },
    }
})

export const { checkThemeMode } = checkThemeSlice.actions
export default checkThemeSlice.reducer

export const checkThemeColor = data => {
    store.dispatch(checkThemeMode({ data }))
}

// Selector function to get tempdata from the state
export const checkThemeSelector = state => state.checkTheme

// Selector function to get categoryCount from the state
export const themeSelector = createSelector(checkThemeSelector, checkTheme => checkTheme.data.isDarkMode)
