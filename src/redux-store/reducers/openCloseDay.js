import types from "../actions/types";

const initialState = {    
    isLoading: false
};

const Category = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.openCloseDay.SWITCH_DAY_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
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

export default Category;