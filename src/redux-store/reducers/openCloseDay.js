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
        default: {
            return state;
        }
    }
});

export default Category;