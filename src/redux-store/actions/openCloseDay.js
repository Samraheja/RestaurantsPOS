import { AlertTypes, ErrorMessages, GlobalConstants, SuccessMessages } from "../../constants/constants";
import types from "./types";
import { updateDayOpenCloseStatus } from "./profile";
import { addAlert } from "./alert";

export const openCloseDay = payload => {
    const { params, successMessage, operation, onSuccess, dispatch } = payload;
    dispatch(switchDayLoader({ status: true }));

    return {
        type: types.openCloseDay.OPEN_CLOSE_DAY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: (response) => {
                    const result = response.data;
                    let alertType;
                    let message;

                    if (result === 1) {
                        alertType = AlertTypes.Success;
                        message = operation === "Open" ? SuccessMessages.DayOpened : SuccessMessages.DayClosed;
                        dispatch(updateDayOpenCloseStatus({
                            status: operation === "Open"
                        }));
                    } else {
                        alertType = AlertTypes.Danger;
                        if (result === 0) {
                            message = ErrorMessages.CommonError;
                        } else if (result === -1) {
                            message = ErrorMessages.NotOpenned;
                        } else if (result === -2) {
                            message = ErrorMessages.AlreadyOpened;
                        } else if (result === -3) {
                            message = ErrorMessages.AlreadyClosed;
                        } else if (result === -4) {
                            message = ErrorMessages.UnsettledBills;
                        } else if (result === -5) {
                            message = ErrorMessages.PreviousOpened;
                        }
                    }
                    if (message && alertType) {
                        dispatch(addAlert({
                            alertType,
                            message
                        }));
                    }
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