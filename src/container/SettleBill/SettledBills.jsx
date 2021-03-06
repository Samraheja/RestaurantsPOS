import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import SettledBillsComp from "../../components/SettleBill/SettledBills";
import { GlobalConstants, SettledBillsDefaults } from "../../constants/constants";
import { getSettledBills } from "../../redux-store/actions/settleBill";
import moment from 'moment';

const SettledBills = (props) => {
    const [state, setState] = useState({
        ...SettledBillsDefaults
    });
    const [isSettleBillVisible, toggleSettleBill] = useState(false);
    const dispatch = useDispatch();
    const { totalRecords, totalPages, settledBills, isSettledLoading } = useSelector(state => state.settleBill);

    const getSettledBillsDetails = useCallback((date) => {
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
    }, [state.sortBy, state.order, state.pageNo, dispatch]);

    useEffect(() => {
        const date = props.history.location.state;

        if (date) {
            const dateParts = date.split("/");
            const billDate = moment(new Date(dateParts[2], dateParts[1] - 1, dateParts[0])).format('YYYY-MM-DD');

            setState(prevState => ({
                ...prevState,
                billDate: billDate
            }));
        }
        getSettledBillsDetails(state.billDate);
    }, [state.billDate, state.sortBy, state.order, state.pageNo, getSettledBillsDetails, dispatch]);

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

    const switchModal = () => {
        toggleSettleBill(!isSettleBillVisible)
    };

    const onEditSettlement = (billId) => {
        if (billId !== undefined && billId > 0) {
            setState(prevState => ({
                ...prevState,
                billId: billId,
                showSettleBill: true
            }));

            toggleSettleBill(true)
        }
    }

    if (isSettledLoading) {
        return <Loader />
    }
    else {
        return (
            <SettledBillsComp
                isSettleBillVisible={isSettleBillVisible}
                billDate={state.billDate}
                onChange={onChange}
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                settledBills={settledBills}
                onPageChange={onPageChange}
                SortRecords={SortRecords}
                onEditSettlement={onEditSettlement}
                switchModal={switchModal}
                billId={state.billId}
                showSettleBill={state.showSettleBill}
            />
        );
    }
};

export default SettledBills;