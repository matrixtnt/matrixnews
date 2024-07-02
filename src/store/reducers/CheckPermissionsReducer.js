// Import necessary modules
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'

// Initial state with some default data
const initialState = {
  data: {
    isNotificaitonPermission: '',
    isLocationPermission: '',
    isNotificaitonPermissionCheck: false,
    isLocaitonPermissionCheck: false,
  }
}
// Create a Redux slice
export const checkPermissionSlice = createSlice({
  name: 'checkPermission',
  initialState,
  reducers: {
    checkNotificationPermission: (state, action) => {
      const { isNotificationPermission } = action.payload.data
      state.data.isNotificaitonPermission = isNotificationPermission
    },
    checkLocationPermission: (state, action) => {
      const { isLocationPermission } = action.payload.data
      state.data.isLocationPermission = isLocationPermission
    },
    isNotificationPermissionCheck: (state, action) => {
      const { isNotificaitonPermissionChecked } = action.payload.data
      state.data.isNotificaitonPermissionCheck = isNotificaitonPermissionChecked
    },
    isLocationPermissionCheck: (state, action) => {
      const { isLocaitonPermissionChecked } = action.payload.data
      state.data.isLocaitonPermissionCheck = isLocaitonPermissionChecked
    },
    resetPermissionData: (deafaultState) => {
      deafaultState = initialState;
      return deafaultState;
    },
  }
})

// Export the categoryCount reducer and action
export const { checkNotificationPermission, checkLocationPermission, isNotificationPermissionCheck, isLocationPermissionCheck, resetPermissionData } = checkPermissionSlice.actions
export default checkPermissionSlice.reducer

// Function to load category count data
export const checkNotificationPermissionGranted = data => {
  store.dispatch(checkNotificationPermission({ data }))
}
export const checkLocationPermissionGranted = data => {
  store.dispatch(checkLocationPermission({ data }))
}
// Function to load category count data
export const isLocationPermissionCheckOnce = data => {
  store.dispatch(checkNotificationPermission({ data }))
}
export const isNotificationPermissionCheckOnce = data => {
  store.dispatch(checkLocationPermission({ data }))
}

// Selector function to get tempdata from the state
export const checkPermissionsSelector = state => state.checkPermission

// Selector function to get categoryCount from the state
export const notificationPermissionSelector = createSelector(checkPermissionsSelector, checkPermission => checkPermission.data.isNotificaitonPermission)
export const locationPermissionSelector = createSelector(checkPermissionsSelector, checkPermission => checkPermission.data.isLocationPermission)



// clear state data 
export const resetPermission = () => {
  store.dispatch(resetPermissionData())
}