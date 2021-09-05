import { GlobalConstants } from "../../constants/apiConstants";
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