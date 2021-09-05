import types from "./types";

export const addAlert = payload => {
    return {
        type: types.alert.ADD_ALERT,
        payload
    }
};

export const deleteAlert = payload => {
    return {
        type: types.alert.DELETE_ALERT,
        payload
    }
};