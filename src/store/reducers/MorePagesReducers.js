// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'
import moment from 'moment'
import { apiCallBegan } from '../actions/apiActions'

// Initial state with some default data
const initialState = {
    loading: false,
    lastFetch: null,
    data: [],
    Lang: null,

}

// Create a Redux slice
export const morePagesSlice = createSlice({
    name: 'morePages',
    initialState,
    reducers: {

        morePagesRequested: (state, action) => {
            state.loading = true;
        },
        morePagesSuccess: (state, action) => {
            state.loading = false;
            state.morePages = action.payload.data;
            state.lastFetch = Date.now();
            state.Lang = action.request
        },
        morePagesFailed: (state, action) => {
            state.loading = false;
        },
    }
})

export const {
    morePagesRequested,
    morePagesSuccess,
    morePagesFailed
} = morePagesSlice.actions
export default morePagesSlice.reducer



// API CALLS
export const loadMorePages = ({
    slug = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { }
}) => {
    const { currentLanguage } = store.getState().languages
    const { lastFetch, Lang } = store.getState().morePages;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    // If API data is fetched within last 10 minutes then don't call the API again
    if (currentLanguage?.id != Lang?.language_id || diffInMinutes > process.env.NEXT_PUBLIC_LOAD_MIN) {
        store.dispatch(
            apiCallBegan({
                ...getPages(slug),
                displayToast: false,
                onStartDispatch: categoriesRequested.type,
                onSuccessDispatch: categoriesSuccess.type,
                onErrorDispatch: categoriesFailed.type,
                onStart,
                onSuccess,
                onError,
            })
        );
    }
};

export const getMorePagesData = createSelector(
    (state) => state.morePages,
    (morePages) => morePages.data
);