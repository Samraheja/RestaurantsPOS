import React, { useState } from "react";
import { ErrorMessages, SuccessMessages, AlertTypes, GlobalConstants } from '../../constants/constants';
import ForgotPasswordComp from "../../components/ForgotPassword/ForgotPassword";
import { doesHaveValue, isValidEmail } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../redux-store/actions/alert";
import { forgotPassword } from '../../redux-store/actions/login';

const ForgotPassword = (props) => {
    const [state, setState] = useState({
        email: "",
        errorMessages: {}
    });

    const { isLoading } = useSelector(state => state.login);
    const dispatch = useDispatch();

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

    const redirectToLogin = () => {
        props.history.push('/auth/login');
    }

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const email = id && id === "email" ? value : state.email;

        if (!doesHaveValue(email)) {
            finalErrorMessages.email = ErrorMessages.EmailRequired;
        }
        else if (!isValidEmail(email)) {
            finalErrorMessages.email = ErrorMessages.ValidEmail;
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
                    "Url": GlobalConstants.FORGOT_PASSWORD_LINK
                }
            }

            const onSuccess = (response) => {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        email: ""
                    }));
                }
                else if (response.status === 204) {
                    dispatch(addAlert({
                        alertType: AlertTypes.Danger,
                        message: ErrorMessages.EmailIdNoExist
                    }));
                }
            }

            const successMessage = SuccessMessages.ForogtPassword;

            dispatch(forgotPassword({
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
        <ForgotPasswordComp
            email={state.email}
            handleChange={handleChange}
            handleSubmitClick={handleSubmitClick}
            redirectToLogin={redirectToLogin}
            errorMessages={state.errorMessages}
            isLoading={isLoading}
        />
    );
};

export default ForgotPassword;