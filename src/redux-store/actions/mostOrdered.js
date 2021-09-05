import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";

export const getMostOrdered = payload => {
    const { params, dispatch } = payload;
    dispatch(switchMostOrdered({ status: true }));
    
    return {
        type: types.mostOrdered.GET_MOST_ORDERED,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/ConditionalGet",
                params,
                onSuccess: () => {
                    dispatch(switchMostOrdered({ status: false }));
                },
                onError: () => {
                    dispatch(switchMostOrdered({ status: false }));
                }
            }
        }
    }
};

export const switchMostOrdered = payload => {
    return {
        type: types.mostOrdered.SWITCH_MOST_ORDERED,
        payload
    }
};