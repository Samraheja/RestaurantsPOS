import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import TablesComp from "../../components/Tables/Tables";
import { SuccessMessages } from "../../constants/apiConstants";
import { toggleModal } from "../../redux-store/actions/modal";
import { voidOrder } from "../../redux-store/actions/order";
import { getTablesStatus } from "../../redux-store/actions/tables";

const Tables = (props) => {
    const [state, setState] = useState({
        showCover: false,
        showSettleBill: false,
        tableNumber: 0,
        orderType: "Dine-in",
        billId: 0,
        billNumber: "",
        netAmount: 0
    });

    const { userDetails } = useSelector(state => state.profile);
    const { tablesStatus, isLoading } = useSelector(state => state.tables);
    const dispatch = useDispatch();

    useEffect(() => {
        const payload = {
            CollectionName: "Tables"
        };

        dispatch(getTablesStatus({
            params: payload,
            dispatch
        }));

        if (!userDetails.isOpenedForDay) {
            dispatch(toggleModal());
        }
    }, [userDetails.isOpenedForDay]);

    const switchModal = () => {
        dispatch(toggleModal());
    };

    const onTableClick = (billId, tableNumber) => {
        if (billId !== undefined && billId > 0) {
            props.history.push("/admin/order", billId);
        }
        else {
            if (userDetails.isOpenedForDay) {
                setState(prevState => ({
                    ...prevState,
                    showCover: true,
                    tableNumber: tableNumber
                }));

                dispatch(toggleModal());
            }
            else {
                dispatch(toggleModal());
            }
        }
    }

    const onSettleBill = (billId, tableNumber, billNumber, netAmount) => {
        if (billId !== undefined && billId > 0) {
            setState(prevState => ({
                ...prevState,
                showSettleBill: true,
                billId: billId,
                tableNumber: tableNumber,
                billNumber: billNumber,
                netAmount: netAmount
            }));

            dispatch(toggleModal());
        }
    }

    const onVoidBill = (billId) => {
        if (billId !== undefined && billId > 0) {
            const payload = {
                CollectionName: "Billing",
                Operation: "Void Bill",
                "Billing": {
                    "ID": parseInt(billId)
                }
            };

            const successMessage = SuccessMessages.OrderVoided;

            const onSuccess = () => {
                const payload = {
                    CollectionName: "Tables"
                };
        
                dispatch(getTablesStatus({
                    params: payload,
                    dispatch
                }));
            }

            dispatch(voidOrder({
                params: payload,
                successMessage,
                onSuccess,
                dispatch
            }));
        }
    }

    return (
        <>
            {
                isLoading && <Loader />
            }
            <TablesComp
                noOfTables={userDetails.noOfTables}
                showCover={state.showCover}
                tableNumber={state.tableNumber}
                orderType={state.orderType}
                switchModal={switchModal}
                tablesStatus={tablesStatus}
                onTableClick={onTableClick}
                history={props.history}
                isOpenedForDay={userDetails.isOpenedForDay}
                showSettleBill={state.showSettleBill}
                billId={state.billId}
                billNumber={state.billNumber}
                netAmount={state.netAmount}
                onSettleBill={onSettleBill}
                onVoidBill={onVoidBill}
            >
            </TablesComp>
        </>
    )
};

export default Tables;