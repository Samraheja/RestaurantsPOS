import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubCategoryComp from "../../components/SubCategory/SubCategory";
import { GlobalConstants, SubCategoryDefaults, SuccessMessages } from "../../constants/constants";
import { deleteSubCategory, getSubCategories } from "../../redux-store/actions/subCategory";
import Loader from "../../components/AppComponents/Loader/Loader";

const SubCategory = (props) => {
    const [state, setState] = useState({
        ...SubCategoryDefaults,
        editSubCategory: {}
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, subCategories, isLoading } = useSelector(state => state.subCategory);

    useEffect(() => {
        const payload = {
            CollectionName: "SubCategory",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            SearchValue: state.searchValue
        };

        dispatch(getSubCategories({
            params: payload,
            dispatch
        }));
    }, [state.pageNo, state.sortBy, state.order, state.searchValue, dispatch]);

    const closeModal = () => {
        setState(prevState => ({
            ...prevState,
            editSubCategory: {},
            isAddSubCategoryActive: false
        }));
    };
    const onAddSubCategory = () => {
        setState(prevState => ({
            ...prevState,
            isAddSubCategoryActive: true
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

    const onSubCategoryEdit = (Id, categoryId, categoryName, subCategoryName) => {
        setState(prevState => ({
            ...prevState,
            editSubCategory: {
                "Id": Id,
                "categoryId": categoryId,
                "categoryName": categoryName,
                "subCategoryName": subCategoryName
            },
            isAddSubCategoryActive: true
        }));
    };

    const onSubCategoryDelete = (Id) => {
        const payload = {
            "Id": Id,
            "CollectionName": "SubCategory"
        };

        const successMessage = SuccessMessages.SubCategoryDeleted;

        dispatch(deleteSubCategory({
            params: payload,
            successMessage,
            dispatch
        }));
    };

    if (isLoading) {
        return <Loader/>
    } else {
        return (
            <SubCategoryComp
                onAddSubCategory={onAddSubCategory}
                isAddSubCategoryActive={state.isAddSubCategoryActive}
                totalRecords={totalRecords}
                totalPages={totalPages}
                pageNo={state.pageNo}
                subCategories={subCategories}
                onPageChange={onPageChange}
                closeModal={closeModal}
                onSubCategoryEdit={onSubCategoryEdit}
                onSubCategoryDelete={onSubCategoryDelete}
                editSubCategory={state.editSubCategory}
                SortRecords={SortRecords}
            />
        );
    }
};

export default SubCategory;