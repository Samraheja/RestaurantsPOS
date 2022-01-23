import { GlobalConstants } from "../../constants/apiConstants";
import { toggleModal } from "./modal";
import types from "./types";

export const getVendors = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.BIND_VENDORS,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response)
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const getPaymentModes = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.BIND_PAYMENT_MODES,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const GetBillToSetlle = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.GET_BILL_TO_SETTLE,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const settleBillDetails = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.SETTLE_BILL,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Create",
                params,
                onSuccess: (response) => {
                    dispatch(toggleModal());
                    onSuccess && onSuccess(response);
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const getSettledPaymentDetails = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.GET_SETTLED_PAYMENT_DETAILS,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/GET",
                params,
                onSuccess: (response) => {
                    onSuccess && onSuccess(response);
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const updateSettledBillDetails = payload => {
    const { params, onSuccess, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.UPDATE_SETTLED_BILL,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/UPDATE",
                params,
                onSuccess: (response) => {
                    dispatch(toggleModal());
                    onSuccess && onSuccess(response);
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const getSettledBills= payload => {
    const { params, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));
    
    return {
        type: types.settleBill.GET_SETTLED_BILL,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchbillSattlementLoader({ status: false }));
                }
            }
        }
    }
};

export const switchbillSattlementLoader = payload => {
    return {
        type: types.settleBill.SWITCH_BILL_SETTLEMENT_LOADER,
        payload
    }
};