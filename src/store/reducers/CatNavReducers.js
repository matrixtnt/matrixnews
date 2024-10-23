// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'
import { getCategoriesApi, getNews } from 'src/utils/api'
import moment from 'moment'
import { apiCallBegan } from '../actions/apiActions'

// Initial state with some default data
const initialState = {
    loading: false,
    lastFetch: null,
    categories: [],
    Lang: null,

}

// Create a Redux slice
export const CategoriesDataSlice = createSlice({
    name: 'categoryData',
    initialState,
    reducers: {

        categoriesRequested: (state, action) => {
            state.loading = true;
        },
        categoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
            state.lastFetch = Date.now();
            state.Lang = action.request
        },
        categoriesFailed: (state, action) => {
            state.loading = false;
            state.categories = [];
        },
        categoriesUpdateLanguage: (state, action) => {
            if (state.Lang) {
                state.Lang.language_id = action.payload
            }
        },
        resetCatData: (deafaultState) => {
            deafaultState = initialState;
            return deafaultState;
        },
    }
})

export const {
    setCatNavData,
    categoriesRequested,
    categoriesSuccess,
    categoriesFailed,
    categoriesUpdateLanguage,
    resetCatData } = CategoriesDataSlice.actions
export default CategoriesDataSlice.reducer


export const loadCatNavData = data => {
    store.dispatch(setCatNavData({ data }))
}


// API CALLS
export const loadCategories = ({
    offset = "",
    limit = "",
    language_id = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { }
}) => {

    const firstLoad = sessionStorage.getItem('firstLoad_Categories')
    const manualRefresh = sessionStorage.getItem('manualRefresh_Categories')

    const shouldFetchData = !firstLoad || manualRefresh === 'true'


    if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('manualRefresh_Categories', 'true')
        })

        window.addEventListener('load', () => {
            // Check if this is a manual refresh by checking if lastFetch is set
            if (!sessionStorage.getItem('lastFetch_Categories')) {
                sessionStorage.setItem('manualRefresh_Categories', 'true')
            }
        })
    }

    const state = store.getState()
    const { currentLanguage } = store.getState().languages
    const { lastFetch, Lang } = store.getState().categoryData ?? {};
    const diffInMinutes = lastFetch ? moment().diff(moment(lastFetch), 'minutes') : process.env.NEXT_PUBLIC_LOAD_MIN + 1
    // If API data is fetched within last 10 minutes then don't call the API again
    if (currentLanguage?.id != Lang?.language_id || shouldFetchData) {
        store.dispatch(
            apiCallBegan({
                ...getCategoriesApi(offset, limit, language_id),
                displayToast: false,
                onStartDispatch: categoriesRequested.type,
                onSuccessDispatch: categoriesSuccess.type,
                onErrorDispatch: categoriesFailed.type,
                onStart,
                onSuccess: res => {
                    sessionStorage.setItem('lastFetch_Categories', Date.now())
                },
                onError,
            })
        );

        // Clear manualRefresh flag
        sessionStorage.removeItem('manualRefresh_Categories')

        // Set firstLoad flag to prevent subsequent calls
        sessionStorage.setItem('firstLoad_Categories', 'true')
    }
};


export const categoriesCacheData = createSelector(
    (state) => state.categoryData,
    (categoryData) => categoryData.categories
);

// clear state data 
export const resetCat = () => {
    store.dispatch(resetCatData())
}