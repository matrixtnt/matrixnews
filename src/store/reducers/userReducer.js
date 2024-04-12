
import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { updateProfileApi, userSignUpApi } from "../../utils/api";
import { apiCallBegan } from "../actions/apiActions";

// state
const initialState = {
    data: null,
    isLogin: false,
    mobileLoginType: false,
    userManageData: []
};

// slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (user, action) => {
            let { data } = action.payload;
            user.data = data;
        },
        logoutSuccess: (user) => {
            user = initialState;
            return user;
        },

        imageUploadSuccess: (user, action) => {
            let { data } = action.payload;
            user.data.profile = data.profile;
        },
        profileUpdateDataSuccess: (user, action) => {
            let data = action.payload.data;
            user.data.name = data.name;
            user.data.mobile = data.mobile
            user.data.email = data.email
        },
        mobileTypeSuccess: (user, action) => {
            user.mobileLoginType = action.payload.data
        },
        userManageDataSuccess: (user, action) => {
            let data = action.payload.data;
            user.data = data
        }
    }

});

export const { loginSuccess, logoutSuccess, imageUploadSuccess, profileUpdateDataSuccess, mobileTypeSuccess, userManageDataSuccess } = userSlice.actions;
export default userSlice.reducer;

// api calls

// register
export const register = async ({
    firebase_id = "",
    name = "",
    email = "",
    mobile = "",
    type = "",
    profile = "",
    status = "",
    fcm_id = "",
    onSuccess = () => { },
    nError = () => { },
    onStart = () => { } }) => {
    store.dispatch(apiCallBegan({
        ...userSignUpApi(firebase_id, name, email, mobile, type, profile, status, fcm_id),
        displayToast: false,
        onSuccessDispatch: loginSuccess.type,
        onStart,
        onSuccess,
        onError
    }))
};

// profile image update
export const updateProfileImage = ({ name = "", mobile = "", email = "", image = "", onSuccess = () => { }, onError = () => { }, onStart = () => { } }) => {
    store.dispatch(apiCallBegan({
        ...updateProfileApi(name, mobile, email, image),
        displayToast: false,
        onSuccessDispatch: imageUploadSuccess.type,
        onStart,
        onSuccess,
        onError
    }))
};

// update profile data
export const updateProfileData = ({ name = "", mobile = "", email = "", image = "", onSuccess = () => { }, onError = () => { }, onStart = () => { } }) => {
    store.dispatch(apiCallBegan({
        ...updateProfileApi(name, mobile, email, image),
        displayToast: false,
        onSuccessDispatch: profileUpdateDataSuccess.type,
        onStart,
        onSuccess,
        onError,
    }))
}

// load mobile type
export const loadMobileType = (data) => {
    store.dispatch(mobileTypeSuccess({ data }))
}


// logout
export const logoutUser = () => {
    store.dispatch(logoutSuccess())
}


// selectors
export const selectUser = (state) => state.user;
