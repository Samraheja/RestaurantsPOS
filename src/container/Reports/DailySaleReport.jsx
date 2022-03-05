import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import DailySaleReportComp from "../../components/Reports/DailySaleReport";
import { GlobalConstants, DailySaleReportDefaults } from "../../constants/constants";
import { getDailySaleReport } from "../../redux-store/actions/reports";

const DailySaleReport = (props) => {
    const [state, setState] = useState({
        ...DailySaleReportDefaults
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, dailySales = [], isLoading } = useSelector(state => state.report);
    
    useEffect(() => {
        const payload = {
            CollectionName: "Reports",
            Operation: "DaySaleByPaymentMode",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            SearchValue: state.searchValue,
            "ReportFilters": {
                "Month": parseInt(state.month),
                "Year": parseInt(state.year)
            }
        };

        dispatch(getDailySaleReport({
            params: payload,
            dispatch
        }));
    }, [state.month, state.year, state.pageNo, state.sortBy, state.order, state.searchValue, dispatch]);

    const onChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const SortRecords = (column) => {
        setState(prevState => ({
            ...prevState,
            sortBy: column,
            order: prevState.sortBy === column ? state.order === "asc" ? "desc" : "asc" : "asc"
        }));
    };

    const onPageChange = (newPageNo) => {
        if (state.pageNo !== newPageNo) {
            setState(prevState => ({
                ...prevState,
                pageNo: parseInt(newPageNo)
            }));
        }
    };

    const onDateClick = (date) => {
        props.history.push("/admin/SettledBills", date);
    };

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <DailySaleReportComp
                month={parseInt(state.month)}
                year={parseInt(state.year)}
                onChange={onChange}
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                dailySales={dailySales}
                onPageChange={onPageChange}
                SortRecords={SortRecords}
                onDateClick={onDateClick}
            />
        );
    }
};

export default DailySaleReport;