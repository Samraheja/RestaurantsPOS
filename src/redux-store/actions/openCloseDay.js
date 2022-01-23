import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";

export const openCloseDay = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchDayLoader({ status: true }));

    return {
        type: types.openCloseDay.OPEN_CLOSE_DAY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchDayLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchDayLoader({ status: false }));
                }
            }
        }
    }
};

export const switchDayLoader = payload => {
    return {
        type: types.openCloseDay.SWITCH_DAY_LOADER,
        payload
    }
};