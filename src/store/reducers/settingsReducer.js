
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { apiCallBegan } from "../actions/apiActions";
import { getSettingsApi } from "../../utils/api";

const initialState = {
    data: null,
    loading: false,
    lat:null,
    long:null,
    fcmtoken:"",
    systemTimezone: '',
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
            // token.data = action.payload.data
        },
        settingsFailed: (settings) => {
            settings.loading = false;
        },
        latlong:(settings,action)=>{
            let {lat,long} = action.payload;
            settings.lat = lat
            settings.long = long
        },
        fcmToken:(settings,action)=>{
            settings.fcmtoken = action.payload.data
        },
        systemTimezone:(settings,action)=>{
            settings.systemTimezone = action.payload.data
        },

    }
})


export const { settingsRequested,settingsSuccess,settingsFailed,latlong,fcmToken,systemTimezone } = settingsSlice.actions;
export default settingsSlice.reducer;

// load websettings api call
export const laodSettingsApi = ({type="",onSuccess=()=>{}, onError=()=>{}, onStart=()=>{}}) => {
    store.dispatch(apiCallBegan({
        ...getSettingsApi(type),
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

// load fcmToken
export const loadFcmToken = (data) => {
    store.dispatch(fcmToken({data}))
}
// load fcmToken
export const loadSystemTimezone = (data) => {
    store.dispatch(systemTimezone({data}))
}
export const systemTimezoneData = createSelector(
    state => state.settings,
    settings => settings
)

// Selector Functions
export const settingsData = createSelector(
    state => state.settings,
    settings => settings.data,
)
