import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddCoverComp from "../../components/Tables/AddCover";
import { AddCoverDefaults, ErrorMessages } from "../../constants/apiConstants";
import { toggleModal } from "../../redux-store/actions/modal";
import { addTableCover } from "../../redux-store/actions/tables";
import { doesHaveValue, isDigitsOnly, isValidDigits } from "../../utils/functions";

const AddCover = (props) => {
    const [state, setState] = useState({
        ...AddCoverDefaults
    });

    const dispatch = useDispatch();

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = Validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: value,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const cover = id && id === "cover" ? value : state.cover;

        if (!doesHaveValue(cover)) {
            finalErrorMessages.cover = ErrorMessages.CoverRequired;
        }
        else if (!isDigitsOnly(cover)) {
            finalErrorMessages.cover = ErrorMessages.DigitsOnly;
        }
        else if (!isValidDigits(cover)) {
            finalErrorMessages.cover = ErrorMessages.ValidDigits;
        }

        return finalErrorMessages;
    };

    const onAddCover = (e) => {
        e.preventDefault();
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {

            const payload = {
                "CollectionName": "Billing",
                "Billing": {
                    "TableNumber": parseInt(props.tableNumber),
                    "Cover": parseInt(state.cover),
                    "OrderType": props.orderType
                }
            }

            const onSuccess = (response) => {
                dispatch(toggleModal());
                const billId = response.data.id;
                props.history.push("/admin/order", billId);
            }

            dispatch(addTableCover({
                params: payload,
                onSuccess,
                dispatch
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    return (
        <AddCoverComp
            cover={state.cover}
            tableNumber={props.tableNumber}
            onChange={onChange}
            onAddCover={onAddCover}
            errorMessages={state.errorMessages}
        />
    );
};

export default AddCover;