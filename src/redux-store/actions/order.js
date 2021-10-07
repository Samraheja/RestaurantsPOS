import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";
import { clearCustomer } from "./customer";

export const getOrderItemsList = payload => {
    const { params, dispatch } = payload;
    dispatch(switchOrderLoader({ status: true }));

    return {
        type: types.orders.GET_ORDER_ITEM_LIST,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    dispatch(switchOrderLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchOrderLoader({ status: false }));
                }
            }
        }
    }
};

export const saveOrderItem = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchOrderLoader({ status: true }));

    return {
        type: types.orders.SAVE_ORDER_ITEM,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchOrderLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchOrderLoader({ status: false }));
                }
            }
        }
    }
};

export const updateQuantity = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchOrderLoader({ status: true }));

    return {
        type: types.orders.UPDATE_QUANTITY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchOrderLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchOrderLoader({ status: false }));
                }
            }
        }
    }
};

export const completeOrder = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchOrderLoader({ status: true }));

    return {
        type: types.orders.COMPLETE_ORDER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(clearCustomer());
                    dispatch(switchOrderLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchOrderLoader({ status: false }));
                }
            }
        }
    }
};

export const switchOrderLoader = payload => {
    return {
        type: types.orders.SWITCH_ORDER_LOADER,
        payload
    }
};