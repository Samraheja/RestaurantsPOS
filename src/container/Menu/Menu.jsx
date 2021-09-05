import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import MenuComp from "../../components/Menu/Menu";
import { GlobalConstants, MenuDefaults, SuccessMessages } from "../../constants/apiConstants";
import { deleteMenu, getMenu } from "../../redux-store/actions/menu"

const Menu = (props) => {
    const [state, setState] = useState({
        ...MenuDefaults
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, menu, isLoading } = useSelector(state => state.menu);

    useEffect(() => {
        const payload = {
            CollectionName: "Menu",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            SearchValue: state.searchValue
        };

        dispatch(getMenu({
            params: payload,
            dispatch
        }));
    }, [state, dispatch]);

    const openAddMenu = () => {
        props.history.push('/admin/addMenu');
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

    const onMenuEdit = (Id) => {
        props.history.push("/admin/addmenu", Id);
    };

    const onMenuDelete = (Id) => {
        const payload = {
            "Id": Id,
            "CollectionName": "Menu"
        };

        const successMessage = SuccessMessages.MenuDeleted;

        dispatch(deleteMenu({
            params: payload,
            successMessage,
            dispatch
        }));
    };

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <MenuComp
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                menu={menu}
                onPageChange={onPageChange}
                openAddMenu={openAddMenu}
                onMenuEdit={onMenuEdit}
                onMenuDelete={onMenuDelete}
                editMenu={state.editMenu}
                SortRecords={SortRecords}
            />
        );
    }
};

export default Menu;