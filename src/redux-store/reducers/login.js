import types from "../actions/types";
import { GlobalConstants } from '../../constants/constants';

const initialState = {
    isLoading: false,
    token: {}
};

const Login = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.login.LOGIN_USER: {
            const response = actions.payload.data;

            localStorage.setItem(GlobalConstants.ACCESS_TOKEN_NAME, response.data.token.authToken);
            localStorage.setItem(GlobalConstants.EXPIRY_DATE_NAME, response.data.token.expiryDate);
            localStorage.setItem(GlobalConstants.REFRESH_TOKEN_NAME, response.data.token.refershToken);

            return {
                ...state, token: response.data.token
            }
        }
        case types.login.LOGOUT_USER: {
            localStorage.clear();

            return {
                ...state, token: {}
            }
        }
        case types.login.SWITCH_LOADING_STATUS: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default Login;