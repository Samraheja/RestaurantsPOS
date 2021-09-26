import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import TablesComp from "../../components/Tables/Tables";
import { toggleModal } from "../../redux-store/actions/modal";
import { getTablesStatus } from "../../redux-store/actions/tables"

const Tables = (props) => {
    const [state, setState] = useState({
        showCover: false,
        tableNumber: 0,
        orderType: "Dine-in"
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
            >
            </TablesComp>
        </>
    )
};

export default Tables;