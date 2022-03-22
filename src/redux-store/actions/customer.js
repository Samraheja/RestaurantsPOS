import { GlobalConstants } from "../../constants/constants";
import types from "./types";

export const getCustomers = payload => {
    const { params, dispatch } = payload;
    dispatch(switchCustomerLoader({ status: true }));

    return {
        type: types.customers.GET_CUSTOMERS,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    dispatch(switchCustomerLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCustomerLoader({ status: false}));
                }
            }
        }
    }
}

export const getCustomerById = payload => {
    const { params, dispatch } = payload;
    dispatch(switchCustomerLoader({ status: true }));

    return {
        type: types.customers.GET_CUSTOMER_BY_ID,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GetById",
                params,
                onSuccess: (response) => {
                    dispatch(switchCustomerLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCustomerLoader({ status: false }));
                }
            }
        }
    }
};

export const searchCustomer = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchCustomerLoader({ status: true }));

    return {
        type: types.customers.SEARCH_CUSTOMER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/ConditionalGet",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchCustomerLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCustomerLoader({ status: false }));
                }
            }
        }
    }
};

export const saveCustomer = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchCustomerLoader({ status: true }));
    return {
        type: types.customers.SAVE_CUSTOMER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/CREATE",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchCustomerLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCustomerLoader({ status: false }));
                }
            }
        }
    }
};

export const settleDues = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchCustomerLoader({ status: true }));

    return {
        type: types.customers.SETTLE_DUES,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchCustomerLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCustomerLoader({ status: false }));
                }
            }
        }
    }
};

export const clearCustomer = payload => {
    return {
        type: types.customers.CLEAR_CUSTOMER,
        payload
    }
};

export const switchCustomerLoader = payload => {
    return {
        type: types.customers.SWITCH_CUSTOMER_LOADER,
        payload
    }
};