import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import MostOrderedComp from "../../components/Order/MostOrdered";
import { GlobalConstants, MostOrderedDefaults } from "../../constants/apiConstants";
import { getMostOrdered } from "../../redux-store/actions/mostOrdered";
import { getSubCategories } from "../../redux-store/actions/subCategory";

const MostOrdered = (props) => {
    const [state, setState] = useState({
        ...MostOrderedDefaults
    });

    const dispatch = useDispatch();
    const { mostOrdered, isLoading } = useSelector(state => state.mostOrdered);
    const { subCategories } = useSelector(state => state.subCategory);

    useEffect(() => {
        const payload = {
            CollectionName: "Menu",
            Operation: "MostOrdered",
            Id: parseInt(state.subCategoryId)
        };

        dispatch(getMostOrdered({
            params: payload,
            dispatch
        }));

        if (subCategories.length === 0) {
            const payload = {
                CollectionName: "SubCategory",
                PageNo: parseInt(0),
                Limit: GlobalConstants.Limit,
                SearchValue: ""
            };

            dispatch(getSubCategories({
                params: payload,
                dispatch
            }));
        }
    }, [state.subCategoryId, MostOrdered, dispatch])

    const getMostOrderedItems = (subCategoryId) => {
        setState(prevState => ({
            ...prevState,
            subCategoryId: subCategoryId
        }));
    }

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <MostOrderedComp
                tableNumber={props.tableNumber}
                mostOrdered={mostOrdered}
                onMenuItemAdd={props.onMenuItemAdd}
                subCategories={subCategories}
                getMostOrderedItems={getMostOrderedItems}
            />
        );
    }
};

export default MostOrdered;