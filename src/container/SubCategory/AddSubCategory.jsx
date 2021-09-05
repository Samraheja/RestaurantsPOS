import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSubCategoryComp from "../../components/SubCategory/AddSubCategory";
import { AddSubCategoryDefaults, ErrorMessages, GlobalConstants, SuccessMessages } from "../../constants/apiConstants";
import { getCategories } from "../../redux-store/actions/category";
import { saveSubCategory, updateSubCategory } from "../../redux-store/actions/subCategory";
import { doesHaveValue, isValidAlphabets } from "../../utils/functions";

const AddCategory = (props) => {
    const [state, setState] = useState({
        ...AddSubCategoryDefaults
    });

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        const subCategoryDetails = props.editSubCategory;

        if (Object.keys(subCategoryDetails).length > 0) {
            setState(prevState => ({
                ...prevState,
                id: subCategoryDetails.Id,
                categoryId: subCategoryDetails.categoryId,
                category: subCategoryDetails.categoryName,
                subCategory: subCategoryDetails.subCategoryName,
                buttonText: "Update"
            }));
        }

        const payload = {
            CollectionName: "Category",
            Limit: GlobalConstants.Limit,
            SearchValue: ""
        };

        dispatch(getCategories({
            params: payload,
            dispatch
        }));
    }, [state, props.editSubCategory]);

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = Validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: value,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const category = id && id === "categoryId" ? value : state.categoryId;
        const subCategory = id && id === "subCategory" ? value : state.subCategory;

        if (!doesHaveValue(category)) {
            finalErrorMessages.category = ErrorMessages.CategorySelectionRequired;
        }

        if (!doesHaveValue(subCategory)) {
            finalErrorMessages.subCategory = ErrorMessages.SubCategoryRequired;
        }
        else if (!isValidAlphabets(subCategory)) {
            finalErrorMessages.subCategory = ErrorMessages.ValidAlphabets;
        }

        return finalErrorMessages;
    };

    const onSubCategorySave = (e) => {
        e.preventDefault();
        if (state.id === 0) {
            SaveSubCategory();
        }
        else {
            UpdateSubCategory();
        }
    };

    const SaveSubCategory = () => {
        const finalErrorMessages = Validate();
        
        if (Object.keys(finalErrorMessages).length === 0) {

            const payload = {
                "CollectionName": "SubCategory",
                "SubCategory": {
                    "CategoryId": parseInt(state.categoryId),
                    "Category": {
                        "CategoryName": state.category
                    },
                    "SubCategoryName": state.subCategory
                }
            };

            const successMessage = SuccessMessages.SubCategorySaved;

            dispatch(saveSubCategory({
                params: payload,
                successMessage,
                dispatch
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    const UpdateSubCategory = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {

            const payload = {
                "CollectionName": "SubCategory",
                "SubCategory": {
                    "ID": state.id,
                    "CategoryId": state.categoryId,
                    "Category": {
                        "CategoryName": state.category
                    },
                    "SubCategoryName": state.subCategory
                }
            };

            const successMessage = SuccessMessages.SubCategoryUpdated;

            dispatch(updateSubCategory({
                params: payload,
                successMessage,
                dispatch
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    return (
        <AddSubCategoryComp
            id={state.id}
            categoryId={state.categoryId}
            subCategory={state.subCategory}
            buttonText={state.buttonText}
            onChange={onChange}
            onSubCategorySave={onSubCategorySave}
            errorMessages={state.errorMessages}
            categories={categories}
        />
    );
};

export default AddCategory;