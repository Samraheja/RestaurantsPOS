import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import TablesComp from "../../components/Tables/Tables";
import { AlertTypes, SuccessMessages, TablesDefaults } from "../../constants/constants";
import { addAlert } from "../../redux-store/actions/alert";
import { toggleModal } from "../../redux-store/actions/modal";
import { voidOrder } from "../../redux-store/actions/tables";
import { getTablesStatus } from "../../redux-store/actions/tables";
import { getDailySaleDetails } from "../../redux-store/actions/profile";

const Tables = (props) => {
    const [state, setState] = useState({
        ...TablesDefaults
    });

    const { userDetails } = useSelector(state => state.profile);
    const { tablesStatus, isLoading } = useSelector(state => state.tables);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userDetails.isOpenedForDay) {
            switchModal('isOpenForDayActive')
        }

        const payload = {
            CollectionName: "Tables"
        };

        dispatch(getTablesStatus({
            params: payload,
            dispatch
        }));
    }, [userDetails.isOpenedForDay, dispatch]);

    const switchModal = (key) => {
        setState(prevState => ({
            ...prevState,
            [key]:!state[key]
        }))
    };

    const onTableClick = (billId, tableNumber, isOrderCompleted) => {
        if (isOrderCompleted) {
            // dispatch(addAlert({
            //     alertType: AlertTypes.Info,
            //     message: "Bill has been printed for this table. Please settle bill and view bill details on order report"
            // }));
            props.history.push("/admin/order", billId);
        } else if (billId !== undefined && billId > 0) {
            props.history.push("/admin/order", billId);
        } else {
            if (userDetails.isOpenedForDay) {
                setState(prevState => ({
                    ...prevState,
                    showCover: true,
                    tableNumber: tableNumber
                }));
            }
        }
    }

    const onSettleBill = (billId) => {
        if (billId !== undefined && billId > 0) {
            setState(prevState => ({
                ...prevState,
                showSettleBill: true,
                billId: billId
            }));
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


                const payloadSale = {
                    CollectionName: "DailySales"
                }

                dispatch(getDailySaleDetails({
                    params: payloadSale,
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
                isLoading && <Loader/>
            }
            <TablesComp
                isOpenForDayActive={state.isOpenForDayActive}
                noOfTables={userDetails.noOfTables}
                billId={state.billId}
                tableNumber={state.tableNumber}
                orderType={state.orderType}
                showCover={state.showCover}
                switchModal={switchModal}
                tablesStatus={tablesStatus}
                onTableClick={onTableClick}
                history={props.history}
                isOpenedForDay={userDetails.isOpenedForDay}
                showSettleBill={state.showSettleBill}
                onSettleBill={onSettleBill}
                onVoidBill={onVoidBill}
            >
            </TablesComp>
        </>
    )
};

export default Tables;