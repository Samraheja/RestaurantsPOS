import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTypes, ErrorMessages } from '../../constants/apiConstants';
import { loginUser } from "../../redux-store/actions/login";
import LoginComp from "../../components/Login/Login";
import { doesHaveValue, isValidEmail } from "../../utils/functions";
import { addAlert } from "../../redux-store/actions/alert";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

  const redirectToRegister = () => {
    props.history.push('/auth/register');
  }

  const redirectToForgotPassword = () => {
    props.history.push('/auth/forgot-password');
  }

  const Validate = (id, value) => {
    const finalErrorMessages = {}

    const email = id && id === "email" ? value : state.email;
    const password = id && id === "password" ? value : state.password;

    if (!doesHaveValue(email)) {
      finalErrorMessages.email = ErrorMessages.EmailRequired;
    }
    else if (!isValidEmail(email)) {
      finalErrorMessages.email = ErrorMessages.ValidEmail;
    }

    if (!doesHaveValue(password)) {
      finalErrorMessages.password = ErrorMessages.PasswordRequired;
    }

    return finalErrorMessages;
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const finalErrorMessages = Validate();

    if (Object.keys(finalErrorMessages).length === 0) {

      const payload = {
        "Login": {
          "UserName": state.email,
          "Password": state.password,
          "RememberMe": state.rememberMe
        }
      };

      const onSuccess = (response) => {
        if (response.status === 200) {
          if (response.data.subscriptionStatus === "Subscribed" || (response.data.subscriptionStatus === "Trial Period" && response.data.isProfileUpdated)) {
            props.history.push('/admin/tables');
          }
          else {
            props.history.push('/admin/user-profile');
          }
        } else if (response.status === 204) {
          dispatch(addAlert({
            alertType: AlertTypes.Danger,
            message: ErrorMessages.EmailPwdError
          }));
        }
      }

      dispatch(loginUser({
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
    <LoginComp
      email={state.email}
      password={state.password}
      handleChange={handleChange}
      handleSubmitClick={handleSubmitClick}
      redirectToRegister={redirectToRegister}
      redirectToForgotPassword={redirectToForgotPassword}
      errorMessages={state.errorMessages}
      isLoading={isLoading}
    />
  );
};

export default Login;