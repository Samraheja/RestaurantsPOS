import types from "../actions/types";

const initialState = {
    customers: [],
    totalRecords: 0,
    totalPages: 0,
    customerInfo: {},
    isLoading: false
};

const Orders = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.customers.GET_CUSTOMERS: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                customers: actions.payload.data.data.response
            }
        }
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
        case types.customers.SETTLE_DUES: {
            return {
                ...state,
                customers: state.customers.map((customer) =>
                    (customer.id === actions.payload.fetchConfig.params.DuesSettlement.CustomerId) ?
                        customer.dueAmount = customer.dueAmount - actions.payload.fetchConfig.params.DuesSettlement.Amount
                        :
                        customer
                )
            }
        }
        case types.customers.SWITCH_CUSTOMER_LOADER: {
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

export default Orders;