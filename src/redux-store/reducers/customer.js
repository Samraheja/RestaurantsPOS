import types from "../actions/types";

const initialState = {
    customerInfo: {},
    isLoading: false
};

const Orders = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.customers.GET_CUSTOMER_BY_ID: {
            return {
                ...state,
                customerInfo: actions.payload.data.data.length > 0 && actions.payload.data.data[0]
            }
        }
        case types.customers.SEARCH_CUSTOMER: {
            return {
                ...state,
                customerInfo: actions.payload.data.data.length > 0 && actions.payload.data.data[0]
            }
        }
        case types.customers.SAVE_CUSTOMER: {
            return {
                ...state,
                customerInfo: actions.payload.data.data
            }
        }
        case types.customers.CLEAR_CUSTOMER: {
            return {
                ...state,
                customerInfo: initialState.customerInfo
            }
        }
        case types.customers.SWITCH_CUSTOMER_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default Orders;