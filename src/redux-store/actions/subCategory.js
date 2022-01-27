import { GlobalConstants } from "../../constants/constants";
import { toggleModal } from "./modal";
import types from "./types";

export const getSubCategories = payload => {
    const { params, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.GET_SUB_CATEGORIES,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (Response) => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const getSubCategoriesByCategoryId = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.GET_SUB_CATEGORIES_BY_CATEGORY_ID,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/ConditionalGet",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const saveSubCategory = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.SAVE_SUB_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const getSubCategoryById = payload => {
    const { params, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.GET_SUB_CATEGORY_BY_ID,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GetById",
                params,
                onSuccess: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const updateSubCategory = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.UPDATE_SUB_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const deleteSubCategory = payload => {
    const { params, successMessage, dispatch } = payload;
    dispatch(switchSubCategoryLoader({ status: true }));

    return {
        type: types.subCategory.DELETE_SUB_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Delete",
                params,
                successMessage,
                onSuccess: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchSubCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const switchSubCategoryLoader = payload => {
    return {
        type: types.subCategory.SWITCH_SUB_CATEGORY_LOADER,
        payload
    }
};