
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { apiCallBegan } from "../actions/apiActions";
import { getSettingsApi } from "../../utils/api";
import moment from "moment";

const initialState = {
    data: null,
    loading: false,
    lat: null,
    long: null,
    fcmtoken: "",
    systemTimezone: '',
    lastFetch: null
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        settingsRequested: (settings) => {
            settings.loading = true;
        },
        settingsSuccess: (settings, action) => {
            settings.data = action.payload.data
            settings.loading = false;
            settings.lastFetch = Date.now()
            // token.data = action.payload.data
        },
        settingsFailed: (settings) => {
            settings.loading = false;
        },
        latlong: (settings, action) => {
            let { lat, long } = action.payload;
            settings.lat = lat
            settings.long = long
        },
        fcmToken: (settings, action) => {
            settings.fcmtoken = action.payload.data
        },
        systemTimezone: (settings, action) => {
            settings.systemTimezone = action.payload.data
        },
        resetSettingsData: (deafaultState) => {
            deafaultState = initialState;
            return deafaultState;
        },

    }
})


export const { settingsRequested, settingsSuccess, settingsFailed, latlong, fcmToken, systemTimezone, resetSettingsData } = settingsSlice.actions;
export default settingsSlice.reducer;


// load websettings api call
export const laodSettingsApi = ({
    type = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {

    const firstLoad = sessionStorage.getItem('firstLoad_Settings')
    const manualRefresh = sessionStorage.getItem('manualRefresh_Settings')

    const shouldFetchData = !firstLoad || manualRefresh === 'true'


    if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('manualRefresh_Settings', 'true')
        })

        window.addEventListener('load', () => {
            // Check if this is a manual refresh by checking if lastFetch is set
            if (!sessionStorage.getItem('lastFetch_Settings')) {
                sessionStorage.setItem('manualRefresh_Settings', 'true')
            }
        })
    }

    const { lastFetch } = store.getState().settings;
    const diffInMinutes = lastFetch ? moment().diff(moment(lastFetch), 'minutes') : process.env.NEXT_PUBLIC_LOAD_MIN + 1
    // // If API data is fetched within last 10 minutes then don't call the API again
    if (shouldFetchData) {
        store.dispatch(apiCallBegan({
            ...getSettingsApi(type),
            displayToast: false,
            onStartDispatch: settingsRequested.type,
            onSuccessDispatch: settingsSuccess.type,
            onErrorDispatch: settingsFailed.type,
            onStart,
            onSuccess: res => {
                sessionStorage.setItem('lastFetch_Settings', Date.now())
            },
            onError
        }))
        // Clear manualRefresh flag
        sessionStorage.removeItem('manualRefresh_Settings')

        // Set firstLoad flag to prevent subsequent calls
        sessionStorage.setItem('firstLoad_Settings', 'true')
    }
    else {
        onSuccess(store.getState().settings)
    }
};


// load location
export const loadLocation = (lat, long) => {
    store.dispatch(latlong({ lat, long }))
}

export const locationData = createSelector(
    state => state.settings,
    settings => settings
)

// load fcmToken
export const loadFcmToken = (data) => {
    store.dispatch(fcmToken({ data }))
}
// load fcmToken
export const loadSystemTimezone = (data) => {
    store.dispatch(systemTimezone({ data }))
}
export const systemTimezoneData = createSelector(
    state => state.settings,
    settings => settings
)

// Selector Functions
export const settingsData = createSelector(
    state => state.settings,
    settings => settings?.data,
)


// clear state data 
export const resetSettings = () => {
    store.dispatch(resetSettingsData())
}