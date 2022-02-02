import types from "../actions/types";

const initialState = {
    alertType: null,
    message: null
};

const Alert = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.alert.ADD_ALERT: {
            const { alertType, message } = actions.payload;
            return {
                ...state, 
                alertType, 
                message
            }
        }
        case types.alert.DELETE_ALERT: {
            return {
                ...state, 
                alertType: null,
                message: null
            }
        }
        case types.login.LOGOUT_USER: {
            localStorage.clear();

            return initialState
        }
        default: {
            return state;
        }
    }
});

export default Alert;