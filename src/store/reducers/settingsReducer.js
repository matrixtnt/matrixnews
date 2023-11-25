
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { apiCallBegan } from "../actions/apiActions";
import { getSettingsApi } from "../../utils/api";

const initialState = {
    data: null,
    loading: false,
    lat:null,
    long:null,
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        settingsRequested: (settings, action) => {
            settings.loading = true;
        },
        settingsSuccess: (settings, action) => {
            settings.data = action.payload.data
            settings.loading = false;
            // token.data = action.payload.data
        },
        settingsFailed: (websettings, action) => {
            websettings.loading = false;
        },
        latlong:(websettings,action)=>{
            let {lat,long} = action.payload;
            websettings.lat = lat
            websettings.long = long
        }

    }
})


export const { settingsRequested,settingsSuccess,settingsFailed,latlong } = settingsSlice.actions;
export default settingsSlice.reducer;

// load websettings api call
export const laodSettingsApi = (onSuccess, onError, onStart) => {
    store.dispatch(apiCallBegan({
        ...getSettingsApi(),
        displayToast: false,
        onStartDispatch: settingsRequested.type,
        onSuccessDispatch: settingsSuccess.type,
        onErrorDispatch: settingsFailed.type,
        onStart,
        onSuccess,
        onError
    }))
};

// load location
export const loadLocation = (lat,long) => {
    store.dispatch(latlong({lat,long}))
}

export const locationData = createSelector(
    state => state.settings,
    settings => settings
)

// Selector Functions
export const settingsData = createSelector(
    state => state.settings,
    settings => settings.data,
)
