import { GlobalConstants } from "../../constants/apiConstants";
import types from "./types";

export const getDailySaleReport = payload => {
    const { params, dispatch } = payload;
    dispatch(switchReportLoader({ status: true }));

    return {
        type: types.reports.GET_DAILY_SALES_REPORT,
        payload: {
            fetchConfig: {
                path: GlobalConstants.API_BASE_URL + "/Get",
                params,
                onSuccess: (Response) => {
                    dispatch(switchReportLoader({ status: false }));
                },
                onError: () => {
                    dispatch(switchReportLoader({ status: false }));
                }
            }
        }
    }
};

export const switchReportLoader = payload => {
    return {
        type: types.reports.SWITCH_REPORT_LOADER,
        payload
    }
};