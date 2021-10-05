import { GlobalConstants } from "../../constants/apiConstants";
import { toggleModal } from "./modal";
import { getTablesStatus } from "./tables";
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
    const { params, dispatch } = payload;
    dispatch(switchbillSattlementLoader({ status: true }));

    return {
        type: types.settleBill.BIND_PAYMENT_MODES,
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

                    const payload = {
                        CollectionName: "Tables"
                    };
            
                    dispatch(getTablesStatus({
                        params: payload,
                        dispatch
                    }));
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