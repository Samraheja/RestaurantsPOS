import { GlobalConstants } from "../../constants/constants";
import types from "./types";

export const getMenu = payload => {
    const { params, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));
    
    return {
        type: types.menu.GET_MENU,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (Response) => {
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const saveMenu = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));

    return {
        type: types.menu.SAVE_MENU,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                successMessage,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const getMenuById = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));

    return {
        type: types.menu.GET_MENU_BY_ID,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GetById",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const updateMenu = payload => {
    const { params, successMessage, onSuccess, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));

    return {
        type: types.menu.UPDATE_MENU,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Update",
                params,
                successMessage,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const updateMenuPic = payload => {
    const { params, onSuccess, successMessage, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));

    return {
        type: types.menu.UPDATE_MENU_PIC,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/UploadImages",
                params,
                successMessage,
                onSuccess: (response) => {
                    dispatch(switchMenuLoader({ status: false })); 
                    onSuccess && onSuccess(response);                   
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const deleteMenu = payload => {
    const { params, successMessage, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));

    return {
        type: types.menu.DELETE_MENU,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Delete",
                params,
                successMessage,
                onSuccess: () => {
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const getMeasuringUnits = payload => {
    const { params, dispatch } = payload;
    dispatch(switchMenuLoader({ status: true }));
    
    return {
        type: types.menu.GET_MEASURING_UNITS,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (Response) => {
                    dispatch(switchMenuLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchMenuLoader({ status: false }));
                }
            }
        }
    }
};

export const switchMenuLoader = payload => {
    return {
        type: types.menu.SWITCH_MENU_LOADER,
        payload
    }
};