import { GlobalConstants } from "../../constants/constants";
import types from "./types";

export const getDayBook = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchAccountsLoader({ status: true }));
    
    return {
        type: types.accounts.GET_DAY_BOOK,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchAccountsLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchAccountsLoader({ status: false }));
                }
            }
        }
    }
};

export const getAccountBook = payload => {
    const { params, dispatch } = payload;
    dispatch(switchAccountsLoader({ status: true }));
    
    return {
        type: types.accounts.GET_ACCOUNT_BOOK,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    dispatch(switchAccountsLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchAccountsLoader({ status: false }));
                }
            }
        }
    }
};

export const getAccountDetails = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchAccountsLoader({ status: true }));
    
    return {
        type: types.accounts.GET_ACCOUNT_BOOK,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchAccountsLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchAccountsLoader({ status: false }));
                }
            }
        }
    }
};

export const switchAccountsLoader = payload => {
    return {
        type: types.accounts.SWITCH_ACCOUNT_LOADER,
        payload
    }
};