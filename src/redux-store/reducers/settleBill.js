import types from "../actions/types";

const initialState = {
    vendors: [],
    paymentModes: [],
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