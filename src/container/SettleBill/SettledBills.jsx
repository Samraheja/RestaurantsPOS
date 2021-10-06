import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import SettledBillsComp from "../../components/SettleBill/SettledBills";
import { GlobalConstants, SettledBillsDefaults } from "../../constants/apiConstants";
import { getSettledBills } from "../../redux-store/actions/settleBill";

const SettledBills = (props) => {
    const [state, setState] = useState({
        ...SettledBillsDefaults
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, settledBills, isLoading } = useSelector(state => state.settleBill);

    useEffect(() => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);

        setState(prevState => ({
            ...prevState,
            billDate: date
        }));

        getSettledBillsDetails(date);
    }, [state.billDate, state.sortBy, state.order, state.pageNo, dispatch]);

    const getSettledBillsDetails = (date) => {
        const payload = {
            CollectionName: "BillSettlement",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            "Billing": {
                "BillDate": date
            }
        };

        dispatch(getSettledBills({
            params: payload,
            dispatch
        }));
    };

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

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <SettledBillsComp
                billDate={state.billDate}
                onChange={onChange}
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                settledBills={settledBills}
                onPageChange={onPageChange}
                SortRecords={SortRecords}
            />
        );
    }
};

export default SettledBills;