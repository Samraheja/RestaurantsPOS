import { GlobalConstants } from "../../constants/constants";
import { toggleModal } from "./modal";
import types from "./types";

export const getTablesStatus = payload => {
    const { params, dispatch } = payload;
    dispatch(switchTablesLoader({ status: true }));

    return {
        type: types.tables.GET_TABLES_STATUS,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    dispatch(switchTablesLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchTablesLoader({ status: false }));
                }
            }
        }
    }
};

export const addTableCover = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchTablesLoader({ status: true }));
    
    return {
        type: types.tables.ADD_TABLE_COVER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(toggleModal());
                    dispatch(switchTablesLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchTablesLoader({ status: false }));
                }
            }
        }
    }
};

export const voidOrder = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchTablesLoader({ status: true }));

    return {
        type: types.tables.VOID_ORDER,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchTablesLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchTablesLoader({ status: false }));
                }
            }
        }
    }
};

export const switchTablesLoader = payload => {
    return {
        type: types.tables.SWITCH_TABLES_LOADER,
        payload
    }
};