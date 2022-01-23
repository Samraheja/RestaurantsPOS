import React, { useEffect, useState } from "react";
import { AlertTypes, ErrorMessages, SuccessMessages } from '../../constants/apiConstants';
import ResetPasswordComp from "../../components/ResetPassword/ResetPassword";
import { doesHaveValue, isValidEmail, isValidPassword } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../redux-store/actions/alert";
import { resetPassword } from "../../redux-store/actions/login";

const ResetPassword = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        token: "",
        errorMessages: {}
    });

    const { isLoading } = useSelector(state => state.login);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            email: new URLSearchParams(props.location.search).get("email"),
            token: new URLSearchParams(props.location.search).get("token")
        }));
    }, [props.location.search]);

    const handleChange = (e) => {
        const { id, value } = e.target
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

        const email = id && id === "email" ? value : state.email;
        const password = id && id === "password" ? value : state.password;
        const confirmPassword = id && id === "confirmPassword" ? value : state.confirmPassword;

        if (!doesHaveValue(email)) {
            finalErrorMessages.email = ErrorMessages.EmailRequired;
        }
        else if (!isValidEmail(email)) {
            finalErrorMessages.email = ErrorMessages.ValidEmail;
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
            const payload = {
                "ForgotPassword": {
                    "Email": state.email,
                    "Password": state.password,
                    "Token": state.token
                }
            }

            const onSuccess = (response) => {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        email: "",
                        password: "",
                        confirmPassword: "",
                        token: ""
                    }));

                    window.setTimeout(() => {
                        props.history.push('/login');
                    }, 7000);
                } else if (response.status === 204) {
                    dispatch(addAlert({
                        alertType: AlertTypes.Danger,
                        message: ErrorMessages.EmailIdNoExist
                    }));
                }
            }

            const successMessage = SuccessMessages.ResetPassword;

            dispatch(resetPassword({
                params: payload,
                onSuccess,
                successMessage,
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
        <ResetPasswordComp
            email={state.email}
            password={state.password}
            confirmPassword={state.confirmPassword}
            handleChange={handleChange}
            handleSubmitClick={handleSubmitClick}
            errorMessages={state.errorMessages}
            isLoading={isLoading}
        />
    );
};

export default ResetPassword;