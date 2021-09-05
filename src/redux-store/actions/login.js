import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";

export const loginUser = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchLoadingStatus({ status: true }));

    return {
        type: types.login.LOGIN_USER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Login",
                params,
                onSuccess: (response) => {
                    dispatch(switchLoadingStatus({ status: false }));
                    onSuccess(response);
                },
                onError: () => {
                    dispatch(switchLoadingStatus({ status: false }));
                }
            }
        }
    }
};

export const registerUser = payload => {
    const { params, onSuccess, successMessage, dispatch } = payload;
    dispatch(switchLoadingStatus({ status: true }));

    return {
        type: types.login.REGISTER_USER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Registration",
                params,
                onSuccess: (response) => {
                    dispatch(switchLoadingStatus({ status: false }));
                    onSuccess(response);
                },
                onError: () => {
                    dispatch(switchLoadingStatus({ status: false }));
                },
                successMessage
            }
        }
    }
};

export const forgotPassword = payload => {
    const { params, onSuccess, successMessage, dispatch } = payload;
    dispatch(switchLoadingStatus({ status: true }));

    return {
        type: types.login.FORGOT_PASSWORD,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/ForgotPassword",
                params,
                onSuccess: (response) => {
                    dispatch(switchLoadingStatus({ status: false }));
                    onSuccess(response);
                },
                onError: () => {
                    dispatch(switchLoadingStatus({ status: false }));
                },
                successMessage
            }
        }
    }
};

export const resetPassword = (payload) => {
    const { params, onSuccess, successMessage, dispatch } = payload;
    dispatch(switchLoadingStatus({ status: true }));

    return {
        type: types.login.RESET_PASSWORD,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/ResetPassword",
                params,
                onSuccess: (response) => {
                    dispatch(switchLoadingStatus({ status: false }));
                    onSuccess(response);
                },
                onError: () => {
                    dispatch(switchLoadingStatus({ status: false }));
                },
                successMessage
            }
        }
    }
};

export const logoutUser = payload => {
    const { onSuccess, dispatch } = payload;
    dispatch(switchLoadingStatus({ status: true }));

    return {
        type: types.login.LOGOUT_USER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Logout",
                onSuccess: (response) => {
                    dispatch(switchLoadingStatus({ status: false }));
                    onSuccess(response);
                },
                onError: () => {
                    dispatch(switchLoadingStatus({ status: false }));
                }
            }
        }
    }
};

export const saveUserInfo = payload => {
    return {
        type: types.login.SAVE_USER_INFO,
        payload
    }
};

export const switchLoadingStatus = payload => {

    return {
        type: types.login.SWITCH_LOADING_STATUS,
        payload
    }
};