import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomerSummaryComp from "../../components/Order/CustomerSummary";
import { CustomerSummaryDefault, ErrorMessages } from "../../constants/apiConstants";
import { toggleModal } from "../../redux-store/actions/modal";
import { getCustomerById, searchCustomer } from "../../redux-store/actions/customer";
import { doesHaveValue, isDigitsOnly, isValidMobileNumber } from "../../utils/functions";

const CustomerSummary = (props) => {
    const [state, setState] = useState({
        ...CustomerSummaryDefault
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.customerId !== undefined) {
            const payload = {
                CollectionName: "Customers",
                "Id": parseInt(props.customerId)
            };

            dispatch(getCustomerById({
                params: payload,
                dispatch
            }));
        }
    }, [props.customerId]);

    const switchModal = () => {
        dispatch(toggleModal());
    };

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

        const mobileNumber = id && id === "mobileNumber" ? value : state.mobileNumber;

        if (!doesHaveValue(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.MobileRequired;
        }
        else if (!isDigitsOnly(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.DigitsOnly;
        }
        else if (!isValidMobileNumber(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.ValidMobileNumber;
        }

        return finalErrorMessages;
    };

    const onCustomerSearch = (e) => {
        e.preventDefault();
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const payload = {
                CollectionName: "Customers",
                "Billing": {
                    "ID": parseInt(props.billId)
                },
                "Customers": {
                    "MobileNumber": state.mobileNumber
                }
            };

            const onSuccess = (response) => {
                if (response.data.length === 0) {
                    switchModal();
                }
                else {
                    setState(prevState => ({
                        ...prevState,
                        mobileNumber: ""
                    }));
                }
            }

            dispatch(searchCustomer({
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
        <CustomerSummaryComp
            customerId={props.customerId}
            billId={props.billId}
            mobileNumber={state.mobileNumber}
            onChange={onChange}
            errorMessages={state.errorMessages}
            onCustomerSearch={onCustomerSearch}
            customerInfo={props.customerInfo}
            switchModal={switchModal}
        />
    )
};

export default CustomerSummary;