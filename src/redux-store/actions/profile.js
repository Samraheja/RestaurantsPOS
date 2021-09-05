import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";

export const getUserProfile = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchProfileLoader({ status: true }));

    return {
        type: types.profile.GET_USER_PROFILE,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GetById",
                params,
                onSuccess: (response) => {
                    dispatch(switchProfileLoader({ status: false }));
                    onSuccess && onSuccess(response);
                },
                onError: () => {
                    dispatch(switchProfileLoader({ status: false }));
                }
            }
        }
    }
};

export const updateUserProfile = payload => {
    const { params, successMessage, dispatch } = payload;
    dispatch(switchProfileLoader({ status: true }));

    return {
        type: types.profile.UPDATE_USER_PROFILE,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                onSuccess: () => {
                    dispatch(switchProfileLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchProfileLoader({ status: false }));
                },
                successMessage
            }
        }
    }
};

export const updateUserProfilePic = payload => {
    const { params, onSuccess, successMessage, dispatch } = payload;
    dispatch(switchProfileLoader({ status: true }));

    return {
        type: types.profile.UPDATE_USER_PROFILE_PIC,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/UploadImages",
                params,
                onSuccess: (response) => {
                    dispatch(switchProfileLoader({ status: false })); 
                    onSuccess && onSuccess(response);                   
                },
                onError: () => {
                    dispatch(switchProfileLoader({ status: false }));
                },
                successMessage
            }
        }
    }
};

export const switchProfileLoader = payload => {
    return {
        type: types.profile.SWITCH_PROFILE_LOADER,
        payload
    }
};