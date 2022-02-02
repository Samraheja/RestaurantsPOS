import types from "../actions/types";

const initialState = {
    billingDetails: {},
    orderedItems: [],
    isLoading: false
};

const Orders = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.orders.GET_ORDER_ITEM_LIST: {
            return {
                ...state,
                billingDetails: actions.payload.data.data,
                orderedItems: actions.payload.data.data.itemsList
            }
        }
        case types.orders.SAVE_ORDER_ITEM: {
            return {
                ...state,
                billingDetails: actions.payload.data.data,
                orderedItems: actions.payload.data.data.itemsList
            }
        }
        case types.orders.UPDATE_QUANTITY: {
            return {
                ...state,
                amount: actions.payload.data.data.amount,
                tax: actions.payload.data.data.tax,
                netAmount: actions.payload.data.data.netAmount,
                orderedItems: actions.payload.data.data.itemsList
            }
        }
        case types.orders.COMPLETE_ORDER: {
            return {
                ...state,
                billingDetails: initialState.billingDetails,
                orderedItems: initialState.itemsList
            }
        }
        case types.orders.SWITCH_ORDER_LOADER: {
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