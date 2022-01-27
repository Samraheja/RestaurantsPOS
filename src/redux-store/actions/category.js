import { GlobalConstants } from "../../constants/constants";
import { toggleModal } from "./modal";
import types from "./types";

export const getCategories = payload => {
    const { params, dispatch } = payload;
    dispatch(switchCategoryLoader({ status: true }));

    return {
        type: types.category.GET_CATEGORIES,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (Response) => {
                    dispatch(switchCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const saveCategory = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchCategoryLoader({ status: true }));

    return {
        type: types.category.SAVE_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const getCategoryById = payload => {
    const { params, dispatch } = payload;
    dispatch(switchCategoryLoader({ status: true }));

    return {
        type: types.category.GET_CATEGORY_BY_ID,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GetById",
                params,
                onSuccess: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const updateCategory = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchCategoryLoader({ status: true }));

    return {
        type: types.category.UPDATE_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                successMessage,
                onSuccess: () => {
                    onSuccess && onSuccess();
                    dispatch(switchCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const deleteCategory = payload => {
    const { params, successMessage, dispatch } = payload;
    dispatch(switchCategoryLoader({ status: true }));

    return {
        type: types.category.DELETE_CATEGORY,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Delete",
                params,
                successMessage,
                onSuccess: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchCategoryLoader({ status: false }));
                }
            }
        }
    }
};

export const switchCategoryLoader = payload => {
    return {
        type: types.category.SWITCH_CATEGORY_LOADER,
        payload
    }
};