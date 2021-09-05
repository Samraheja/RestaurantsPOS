import types from "../actions/types";

const initialState = {
    mostOrdered: [],
    isLoading: false
};

const MostOrdered = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.mostOrdered.GET_MOST_ORDERED: {
            return {
                ...state,
                mostOrdered: actions.payload.data.data
            }
        }
        case types.mostOrdered.SWITCH_MOST_ORDERED: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default MostOrdered;