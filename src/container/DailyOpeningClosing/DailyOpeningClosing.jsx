import React from "react";
import { useDispatch } from "react-redux";
import DailyOpeningClosingComp from "../../components/DailyOpeningClosing/DailyOpeningClosing";
import { openCloseDay } from "../../redux-store/actions/openCloseDay";

const DailyOpeningClosing = (props) => {
    const dispatch = useDispatch();

    const onDayOpenClose = () => {
        const operation = props.operation ? props.operation : "Open";

        const payload = {
            "CollectionName": "DailyOpening",
            "Operation": operation
        };

        dispatch(openCloseDay({
            params: payload,
            onSuccess: props.switchModal,
            dispatch,
            operation
        }));
    };

    return (
        <DailyOpeningClosingComp
            message={props.message}
            onDayOpenClose={onDayOpenClose}
            onCancel={props.switchModal}
        />
    );
};

export default DailyOpeningClosing;