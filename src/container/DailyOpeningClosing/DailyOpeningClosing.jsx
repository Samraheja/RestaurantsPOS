import React from "react";
import { useDispatch } from "react-redux";
import DailyOpeningClosingComp from "../../components/DailyOpeningClosing/DailyOpeningClosing";
import { SuccessMessages, ErrorMessages, AlertTypes } from "../../constants/apiConstants";
import { addAlert } from "../../redux-store/actions/alert";
import { toggleModal } from "../../redux-store/actions/modal";
import { updateDayOpenCloseStatus } from "../../redux-store/actions/profile";
import { openCloseDay } from "../../redux-store/actions/openCloseDay";

const DailyOpeningClosing = (props) => {
    const dispatch = useDispatch();

    const onDayOpenClose = () => {
        var operation = "";
        if (!props.operation) {
            operation = "Open"
        }
        else {
            operation = props.operation === "Open" ? "Open" : "Close";
        }

        const payload = {
            "CollectionName": "DailyOpening",
            "Operation": operation
        }

        const successMessage = operation == "Open" ? SuccessMessages.DayOpened : SuccessMessages.DayClosed;

        const onSuccess = (response) => {
            dispatch(toggleModal());

            const result = response.data;
            var alertType = "Danger";
            var message = "";

            if (result === 1) {
                alertType = "Success";
                message = successMessage;

                const status = operation == "Open" ? true : false;

                dispatch(updateDayOpenCloseStatus({
                    status
                }));
            }
            else if (result === 0) {
                message = ErrorMessages.CommonError;
            }
            else if (result === -1) {
                message = ErrorMessages.NotOpenned;
            }
            else if (result === -2) {
                message = ErrorMessages.AlreadyOpened;
            }
            else if (result === -3) {
                message = ErrorMessages.AlreadyClosed;
            }
            else if (result === -4) {
                message = ErrorMessages.UnsettledBills;
            }

            dispatch(addAlert({
                alertType,
                message
            }));
        };

        dispatch(openCloseDay({
            params: payload,
            onSuccess,
            dispatch
        }));
    };

    const onCancel = () => {
        dispatch(toggleModal());
    };

    return (
        <DailyOpeningClosingComp
            message={props.message}
            onDayOpenClose={onDayOpenClose}
            onCancel={onCancel}
        />
    );
};

export default DailyOpeningClosing;