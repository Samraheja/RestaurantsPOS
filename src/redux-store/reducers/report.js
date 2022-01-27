import types from "../actions/types";

const initialState = {
    dailySales: [],
    totalRecords: 0,
    totalPages: 0,
    isLoading: false
};

const Reports = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.reports.GET_DAILY_SALES_REPORT: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                dailySales: actions.payload.data.data.response
            }
        }
        case types.reports.SWITCH_REPORT_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default Reports;