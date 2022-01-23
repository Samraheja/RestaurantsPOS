import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCustomerComp from "../../components/Customers/AddCustomer";
import { AddCustomerDefault, ErrorMessages, SuccessMessages } from "../../constants/apiConstants";
import { saveCustomer } from "../../redux-store/actions/customer";
import { toggleModal } from "../../redux-store/actions/modal";
import { doesHaveValue, isDigitsOnly, isValidAlphabets, isValidAlphaNumeric, isValidEmail, isValidMobileNumber, isValidZipCode } from "../../utils/functions";

const AddCustomer = (props) => {
    const [state, setState] = useState({
        ...AddCustomerDefault
    });

    const dispatch = useDispatch();

    useEffect(() => {
        props.mobileNumber && setState(prevState => ({
            ...prevState,
            mobileNumber: props.mobileNumber
        }));
    }, [props.mobileNumber, dispatch])

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: value,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    }

    const validate = (id, value) => {
        const finalErrorMessages = {}

        const name = id && id === "name" ? value : state.name;
        const email = id && id === "email" ? value : state.email;
        const mobileNumber = id && id === "mobileNumber" ? value : state.mobileNumber;
        const phoneNumber = id && id === "phoneNumber" ? value : state.phoneNumber;
        const address = id && id === "address" ? value : state.address;
        const city = id && id === "city" ? value : state.city;
        const states = id && id === "states" ? value : state.states;
        const zipCode = id && id === "zipCode" ? value : state.zipCode;

        if (!doesHaveValue(name)) {
            finalErrorMessages.name = ErrorMessages.NameRequired;
        }
        else if (!isValidAlphabets(name)) {
            finalErrorMessages.name = ErrorMessages.ValidAlphabets;
        }

        if (doesHaveValue(email)) {
            if (!isValidEmail(email)) {
                finalErrorMessages.email = ErrorMessages.ValidEmail;
            }
        }

        if (!doesHaveValue(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.MobileRequired;
        }
        else if (!isDigitsOnly(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.DigitsOnly;
        }
        else if (!isValidMobileNumber(mobileNumber)) {
            finalErrorMessages.mobileNumber = ErrorMessages.ValidMobileNumber;
        }

        if (doesHaveValue(phoneNumber)) {
            if (!isDigitsOnly(phoneNumber)) {
                finalErrorMessages.phoneNumber = ErrorMessages.DigitsOnly;
            }
            else if (!isValidMobileNumber(phoneNumber)) {
                finalErrorMessages.phoneNumber = ErrorMessages.ValidMobileNumber;
            }
        }

        if (doesHaveValue(address)) {
            if (!isValidAlphaNumeric(address)) {
                finalErrorMessages.address = ErrorMessages.ValidAlphanumeric;
            }
        }

        if (doesHaveValue(city)) {
            if (!isValidAlphabets(city)) {
                finalErrorMessages.city = ErrorMessages.ValidAlphabets;
            }
        }

        if (doesHaveValue(states)) {
            if (!isValidAlphabets(states)) {
                finalErrorMessages.states = ErrorMessages.ValidAlphabets;
            }
        }

        if (doesHaveValue(zipCode)) {
            if (!isValidAlphaNumeric(zipCode)) {
                finalErrorMessages.zipCode = ErrorMessages.DigitsOnly;
            }
            else if (!isValidZipCode(zipCode)) {
                finalErrorMessages.zipCode = ErrorMessages.ValidZipCode;
            }
        }

        return finalErrorMessages;
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        const finalErrorMessages = validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const payload = {
                CollectionName: "Customers",
                "Billing": {
                    "ID": parseInt(props.billId)
                },
                Customers: {
                    "Id": parseInt(state.id),
                    "Name": state.name,
                    "EmailID": state.email,
                    "MobileNumber": state.mobileNumber,
                    "PhoneNumber": state.phoneNumber,
                    "Address": state.address,
                    "City": state.city,
                    "State": state.states,
                    "ZipCode": state.zipCode
                }
            };

            const successMessage = SuccessMessages.CustomerRegistered;

            const onSuccess = () => {
                dispatch(toggleModal());
            }

            dispatch(saveCustomer({
                params: payload,
                successMessage,
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
    }

    return (
        <AddCustomerComp
            name={state.name}
            email={state.email}
            mobileNumber={state.mobileNumber}
            phoneNumber={state.phoneNumber}
            address={state.address}
            city={state.city}
            states={state.states}
            zipCode={state.zipCode}
            errorMessages={state.errorMessages}
            onChange={onChange}
            onSubmitClick={onSubmitClick}
        />
    );
};

export default AddCustomer;