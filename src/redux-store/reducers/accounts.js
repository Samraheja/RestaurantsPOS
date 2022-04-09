import types from "../actions/types";

const initialState = {
    dayBook: {},
    accountBook: [],
    isLoading: false
};

const Accounts = ((state = initialState, actions = {}) => {
    switch(actions.type) {
        case types.accounts.GET_DAY_BOOK: {
            return {
                ...state,
                dayBook: actions.payload.data.data
            }
        }
        case types.accounts.GET_ACCOUNT_BOOK: {
            return {
                ...state,
                accountBook: actions.payload.data.data.response
            }
        }
        case types.accounts.SWITCH_ACCOUNT_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default Accounts;