import React, { useState } from 'react';
import { ErrorMessages, SuccessMessages, AlertTypes } from '../../constants/apiConstants';
import RegisterComp from "../../components/Register/Register";
import {
    doesHaveValue,
    isDigitsOnly,
    isValidAlphaNumeric,
    isValidEmail,
    isValidMobileNumber,
    isValidPassword
} from "../../utils/functions";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux-store/actions/login';
import { addAlert } from '../../redux-store/actions/alert';

const Register = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        errorMessages: {}
    });

    const { isLoading } = useSelector(state => state.login);
    const dispatch = useDispatch();

    const handleChange = (e) => {
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
    }

    const redirectToLogin = () => {
        props.history.push('/auth/login');
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const name = id && id === "name" ? value : state.name;
        const email = id && id === "email" ? value : state.email;
        const mobileNumber = id && id === "mobileNumber" ? value : state.mobileNumber;
        const password = id && id === "password" ? value : state.password;
        const confirmPassword = id && id === "confirmPassword" ? value : state.confirmPassword;

        if (!doesHaveValue(name)) {
            finalErrorMessages.name = ErrorMessages.NameRequired;
        }
        else if (!isValidAlphaNumeric(name)) {
            finalErrorMessages.name = ErrorMessages.ValidName;
        }

        if (!doesHaveValue(email)) {
            finalErrorMessages.email = ErrorMessages.EmailRequired;
        }
        else if (!isValidEmail(email)) {
            finalErrorMessages.email = ErrorMessages.ValidEmail;
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

        if (!doesHaveValue(password)) {
            finalErrorMessages.password = ErrorMessages.PasswordRequired;
        }
        else if (!isValidPassword(password)) {
            finalErrorMessages.password = ErrorMessages.ValidPassword;
        }

        if (!doesHaveValue(confirmPassword)) {
            finalErrorMessages.confirmPassword = ErrorMessages.ConfirmPasswordRequired;
        }
        else {
            if (password !== confirmPassword) {
                finalErrorMessages.confirmPassword = ErrorMessages.PwdConfirmPwd;
            }
        }

        return finalErrorMessages;
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            if (state.acceptTerms) {
                const payload = {
                    "Users": {
                        "Name": state.name,
                        "Email": state.email,
                        "PhoneNumber": state.mobileNumber,
                        "PasswordHash": state.password
                    }
                };

                const onSuccess = (response) => {
                    window.setTimeout(() => {
                        props.history.push('/login');
                    }, 7000);
                }

                const successMessage = SuccessMessages.Register

                dispatch(registerUser(
                    {
                        params: payload,
                        onSuccess,
                        successMessage,
                        dispatch
                    }
                ));
            }
            else {
                dispatch(addAlert({
                    alertType: AlertTypes.Warning,
                    message: ErrorMessages.AcceptTerms
                }));
            }
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    return (
        <RegisterComp
            name={state.name}
            email={state.email}
            mobileNumbe={state.mobileNumber}
            password={state.password}
            confirmPassword={state.confirmPassword}
            handleChange={handleChange}
            handleSubmitClick={handleSubmitClick}
            redirectToLogin={redirectToLogin}
            errorMessages={state.errorMessages}
            isLoading={isLoading}
        />
    );
};

export default Register;