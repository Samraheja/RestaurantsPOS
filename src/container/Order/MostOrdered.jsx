import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import MostOrderedComp from "../../components/Order/MostOrdered";
import { getMostOrdered } from "../../redux-store/actions/mostOrdered";

const MostOrdered = (props) => {
    const dispatch = useDispatch();
    const { mostOrdered, isLoading } = useSelector(state => state.mostOrdered);

    useEffect(() => {
        if (mostOrdered.length === 0) {
            const payload = {
                CollectionName: "Menu",
                Operation: "MostOrdered"
            };

            dispatch(getMostOrdered({
                params: payload,
                dispatch
            }));
        }
    }, [mostOrdered, dispatch])

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <MostOrderedComp
                tableNumber={props.tableNumber}
                mostOrdered={mostOrdered}
                onMenuItemAdd={props.onMenuItemAdd}
            />
        );
    }
};

export default MostOrdered;