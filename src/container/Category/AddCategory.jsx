import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddCategoryComp from "../../components/Category/AddCategory";
import { ErrorMessages, SuccessMessages } from "../../constants/apiConstants";
import { saveCategory, updateCategory } from "../../redux-store/actions/category";
import { doesHaveValue, isValidAlphabets } from "../../utils/functions";

const AddCategory = (props) => {
    const [state, setState] = useState({
        id: 0,
        category: "",
        buttonText: "Save",
        errorMessages: {}
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const categoryDetails = props.editCategory;

        if (Object.keys(categoryDetails).length > 0) {
            setState(prevState => ({
                ...prevState,
                id: categoryDetails.Id,
                category: categoryDetails.categoryName,
                buttonText: "Update"
            }));
        }
    }, [props.editCategory])

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

        const category = id && id === "category" ? value : state.category;

        if (!doesHaveValue(category)) {
            finalErrorMessages.category = ErrorMessages.CategoryRequired;
        }
        else if (!isValidAlphabets(category)) {
            finalErrorMessages.category = ErrorMessages.ValidAlphabets;
        }

        return finalErrorMessages;
    };

    const onCategorySave = (e) => {
        e.preventDefault();
        if (state.id === 0) {
            SaveCategory();
        }
        else {
            UpdateCategory();
        }
    };

    const SaveCategory = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {

            const payload = {
                "CollectionName": "Category",
                "Category": {
                    "CategoryName": state.category
                }
            }

            const successMessage = SuccessMessages.CategorySaved;

            dispatch(saveCategory({
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

    const UpdateCategory = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {

            const payload = {
                "CollectionName": "Category",
                "Category": {
                    "ID": state.id,
                    "CategoryName": state.category
                }
            }

            const successMessage = SuccessMessages.CategoryUpdated;

            dispatch(updateCategory({
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
        <AddCategoryComp
            category={state.category}
            buttonText={state.buttonText}
            onChange={onChange}
            onCategorySave={onCategorySave}
            errorMessages={state.errorMessages}
        />
    );
};

export default AddCategory;