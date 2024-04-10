
import { createSelector, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { getFeatureSection } from 'src/utils/api'
import { apiCallBegan } from '../actions/apiActions'
import { store } from '../store'

const initialState = {
    data: {},
    loading: false,
    lastFetch: null,
    Lang: null
}

export const featureLayoutSlice = createSlice({
    name: 'Layouts',
    initialState,
    reducers: {
        layoutRequested: layout => {
            layout.loading = true
        },
        layoutReceived: (layout, action) => {
            layout.data = action.payload.data
            layout.loading = false
            layout.lastFetch = Date.now()
            layout.Lang = action.request
        },
        layoutRequestFailed: layout => {
            layout.loading = true
        },
        layoutUpdateLanguage: (layout, action) => {
            // console.log(action.payload, 'langId-layoutReducer')
            if (layout.Lang) {
                layout.Lang.language_id = action.payload
            }

        }
    }
})

export const { layoutRequested, layoutReceived, layoutRequestFailed, layoutUpdateLanguage } = featureLayoutSlice.actions
export default featureLayoutSlice.reducer

// API Calls
export const loadLayout = ({ access_key, language_id, offset, limit, slug, latitude, longitude, section_id, onSuccess = () => { }, onError = () => { }, onStart = () => { } }) => {
    const state = store.getState()
    const { currentLanguage } = store.getState()?.languages
    const { lastFetch, Lang } = state.featureLayouts
    console.log(Lang, 'layout-langId')
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

    if ((currentLanguage?.id != Lang?.language_id) || diffInMinutes > 10) {
        store.dispatch(
            apiCallBegan({
                ...getFeatureSection(access_key, language_id, offset, limit, slug, latitude, longitude, section_id),
                displayToast: false,
                onStartDispatch: layoutRequested.type,
                onSuccessDispatch: layoutReceived.type,
                onErrorDispatch: layoutRequestFailed.type,
                onStart,
                onSuccess,
                onError
            })
        )
    }
}

// Selector Functions
export const selectLayout = createSelector(
    state => state.Layouts,
    Layouts => Layouts
)
