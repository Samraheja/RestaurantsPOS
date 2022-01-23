import types from "../actions/types";

const initialState = {
    billingDetails: {},
    vendors: [],
    paymentModes: [],
    settledBills: [],
    totalRecords: 0,
    totalPages: 0,
    isLoading: false
};

const SettleBill = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.settleBill.BIND_VENDORS: {
            return {
                ...state,
                vendors: actions.payload.data.data.response
            }
        }
        case types.settleBill.BIND_PAYMENT_MODES: {
            return {
                ...state,
                paymentModes: actions.payload.data.data.response
            }
        }
        case types.settleBill.GET_BILL_TO_SETTLE: {
            return {
                ...state,
                billingDetails: actions.payload.data.data
            }
        }
        case types.settleBill.GET_SETTLED_BILL: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                settledBills: actions.payload.data.data.response
            }
        }
        case types.settleBill.SWITCH_BILL_SETTLEMENT_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default SettleBill;