import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import SettledBillsComp from "../../components/SettleBill/SettledBills";
import { GlobalConstants, SettledBillsDefaults } from "../../constants/constants";
import { toggleModal } from "../../redux-store/actions/modal";
import { getSettledBills } from "../../redux-store/actions/settleBill";

const SettledBills = (props) => {
    const [state, setState] = useState({
        ...SettledBillsDefaults
    });

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
        dispatch(toggleModal());
    };

    const onEditSettlement = (billId) => {
        if (billId !== undefined && billId > 0) {
            setState(prevState => ({
                ...prevState,
                billId: billId,
                showSettleBill: true
            }));

            dispatch(toggleModal());
        }
    }

    if (isSettledLoading) {
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
                onEditSettlement={onEditSettlement}
                switchModal={switchModal}
                billId={state.billId}
                showSettleBill={state.showSettleBill}
            />
        );
    }
};

export default SettledBills;