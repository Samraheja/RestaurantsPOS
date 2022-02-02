import types from "../actions/types";

const initialState = {
    tablesStatus: {},
    isLoading: false
};

const Tables = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.tables.GET_TABLES_STATUS: {
            const tablesStatus = {};
            actions.payload.data.data.map((item, i) => {
                tablesStatus[item.tableNumber] = item
            });
            return {
                ...state,
                tablesStatus
            }
        }
        case types.tables.SWITCH_TABLES_LOADER: {
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

export default Tables;