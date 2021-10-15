import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import CategoryComp from "../../components/Category/Categroy";
import { GlobalConstants, CategoryDefaults, SuccessMessages } from "../../constants/apiConstants";
import { deleteCategory, getCategories } from "../../redux-store/actions/category";
import { toggleModal } from "../../redux-store/actions/modal";

const Category = (props) => {
    const [state, setState] = useState({
        ...CategoryDefaults,
        editCategory: {}
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, categories, isLoading } = useSelector(state => state.category);

    useEffect(() => {
        const payload = {
            CollectionName: "Category",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            SearchValue: state.searchValue
        };

        dispatch(getCategories({
            params: payload,
            dispatch
        }));
    }, [state, dispatch]);

    const switchModal = () => {
        dispatch(toggleModal());
        setState(prevState => ({
            ...prevState,
            editCategory: {}
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

    const onCategoryEdit = (Id, categoryName) => {
        setState(prevState => ({
            ...prevState,
            editCategory: {
                "Id": Id,
                "categoryName": categoryName
            }
        }));
        dispatch(toggleModal());
    };

    const onCategoryDelete = (Id) => {
        const payload = {
            "Id": Id,
            "CollectionName": "Category"
        };

        const successMessage = SuccessMessages.CategoryDeleted;

        dispatch(deleteCategory({
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
            <CategoryComp
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                categories={categories}
                onPageChange={onPageChange}
                switchModal={switchModal}
                onCategoryEdit={onCategoryEdit}
                onCategoryDelete={onCategoryDelete}
                editCategory={state.editCategory}
                SortRecords={SortRecords}
            />
        );
    }
}

export default Category;