import types from "../actions/types";

const initialState = {
    categories: [],
    totalRecords: 0,
    totalPages: 0,
    isLoading: false
};

const Category = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.category.GET_CATEGORIES: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                categories: actions.payload.data.data.response
            }
        }
        case types.category.GET_CATEGORY_BY_ID: {
            return {
                ...state,
                categories: actions.payload.data.data.response
            }
        }
        case types.category.SAVE_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    actions.payload.data.data
                ]
            }
        }
        case types.category.UPDATE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.map((category) =>
                    (category.id === actions.payload.fetchConfig.params.Category.ID) ?
                        actions.payload.data.data
                        :
                        category
                )
            }
        }
        case types.category.DELETE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.filter((category) =>
                    (category.id !== actions.payload.fetchConfig.params.Id)
                )
            }
        }
        case types.category.SWITCH_CATEGORY_LOADER: {
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

export default Category;