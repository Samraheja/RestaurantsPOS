import types from "../actions/types";

const initialState = {
    subCategories: [],
    totalRecords: 0,
    totalPages: 0,
    isLoading: false
};

const SubCategory = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.subCategory.GET_SUB_CATEGORIES: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                subCategories: actions.payload.data.data.response
            }
        }
        case types.subCategory.GET_SUB_CATEGORIES_BY_CATEGORY_ID: {
            return {
                ...state,
                subCategories: actions.payload.data.data
            }
        }
        case types.subCategory.GET_SUB_CATEGORY_BY_ID: {
            return {
                ...state,
                subCategories: actions.payload.data.data.response
            }
        }
        case types.subCategory.SAVE_SUB_CATEGORY: {
            return {
                ...state,
                subCategories: [
                    ...state.subCategories,
                    actions.payload.data.data
                ]
            }
        }
        case types.subCategory.UPDATE_SUB_CATEGORY: {
            return {
                ...state,
                subCategories: state.subCategories.map((subCategory) =>
                    (subCategory.id === actions.payload.fetchConfig.params.SubCategory.ID) ?
                        actions.payload.data.data : subCategory
                )
            }
        }
        case types.subCategory.DELETE_SUB_CATEGORY: {
            return {
                ...state,
                subCategories: state.subCategories.filter((subCategory) =>
                    (subCategory.id !== actions.payload.fetchConfig.params.Id)
                )
            }
        }
        case types.subCategory.SWITCH_SUB_CATEGORY_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        default: {
            return state;
        }
    }
});

export default SubCategory;