import axios from "axios";
import { addAlert } from "../../redux-store/actions/alert";
import { GlobalConstants, ErrorMessages } from '../../constants/apiConstants';
import { AlertTypes } from "../../constants/apiConstants";
import history from "../../utils/history";

const middleware = (store => function (next) {
    return function (action) {
        const { fetchConfig } = action.payload ?? {};

        const ExpireTime = localStorage.getItem(GlobalConstants.EXPIRY_DATE_NAME);
        if (ExpireTime && Date.parse(ExpireTime) < Date.parse(new Date())) {
            localStorage.clear();
            history.push("/auth/login");
        }

        if (fetchConfig) {
            const { path, params = {}, headers = {}, onSuccess, onError, successMessage } = fetchConfig;

            axios.post(path, params,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.ACCESS_TOKEN_NAME),
                        ...headers
                    }
                })
                .then(function (response) {
                    action.payload = { ...action.payload, data: response }
                    onSuccess && onSuccess(response);

                    if (successMessage) {
                        store.dispatch(addAlert({
                            alertType: AlertTypes.Success,
                            message: successMessage
                        }));
                    };

                    if (response.status === 200) {
                        next(action);
                    }
                    else if (response.status !== 204) {
                        store.dispatch(addAlert({
                            alertType: AlertTypes.Danger,
                            message: ErrorMessages.CommonError
                        }));
                    }
                })
                .catch(function (error) {
                    debugger;
                    onError && onError(error);

                    if (error.response !== undefined) {

                        if (error.response.status === 409) {
                            store.dispatch(addAlert({
                                alertType: AlertTypes.Warning,
                                message: "The value you have entered is already available. Please enter unique value"
                            }));
                        }
                        else {
                            store.dispatch(addAlert({
                                alertType: AlertTypes.Danger,
                                message: error.response.data
                            }));

                            if (error.response.status === 401) {
                                history.push("/auth/login");
                            }
                        }
                    }
                    else {
                        store.dispatch(addAlert({
                            alertType: AlertTypes.Danger,
                            message: error.message === "Network Error" ? ErrorMessages.NetworkError : error.message
                        }));
                    }
                });
        }
        else {
            next(action);
        }
    }
});

export default [middleware];