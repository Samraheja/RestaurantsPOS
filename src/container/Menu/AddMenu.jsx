import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import AddMenuComp from "../../components/Menu/AddMenu";
import { AddMenuDefaults, ErrorMessages, GlobalConstants, ImageTypes, SuccessMessages } from "../../constants/constants";
import { getCategories } from "../../redux-store/actions/category";
import { getSubCategoriesByCategoryId } from "../../redux-store/actions/subCategory";
import { saveMenu, updateMenu, updateMenuPic, getMeasuringUnits } from "../../redux-store/actions/menu";
import { doesHaveValue, isValidAlphaNumeric, isValidPrice } from "../../utils/functions";

const AddMenu = (props) => {
    const [state, setState] = useState({
        ...AddMenuDefaults
    });

    const inputMenuPic = useRef(null);

    const dispatch = useDispatch();
    const { menu, measuringUnits, isLoading } = useSelector(state => state.menu);
    const { categories } = useSelector(state => state.category);
    const { subCategories } = useSelector(state => state.subCategory);
    const menuId = props.history.location.state;
    let editMenu = {};

    useEffect(() => {
        if (categories.length === 0) {
            const payload = {
                CollectionName: "Category",
                Limit: GlobalConstants.Limit,
                SearchValue: ""
            };

            dispatch(getCategories({
                params: payload,
                dispatch
            }));
        };

        if (measuringUnits.length === 0) {
            const payload = {
                CollectionName: "MeasuringUnits"
            };

            dispatch(getMeasuringUnits({
                params: payload,
                dispatch
            }));
        };

        if (menuId !== null && menuId !== undefined) {
            getMenuDetails(menuId);
        }
    }, [menuId, categories.length, dispatch]);

    const getSubCategories = (categoryId) => {
        const payload = {
            CollectionName: "SubCategory",
            "SubCategory": {
                "CategoryId": parseInt(categoryId)
            }
        };

        const onSuccess = (response) => {
            if (response.data.length > 0) {
                setState(prevState => ({
                    ...prevState,
                    subCategoryId: response.data[0].id,
                }));
            }
        };

        dispatch(getSubCategoriesByCategoryId({
            params: payload,
            onSuccess,
            dispatch
        }));
    };

    const getMenuDetails = (menuId) => {
        menu.filter(x => x.id === menuId).map((item) => {
            editMenu = {
                "id": item.id,
                "categoryId": item.category.id,
                "subCategoryId": item.subCategoryId,
                "itemCode": item.itemCode,
                "name": item.name,
                "gst": item.gst,
                "description": item.description,
                "isVeg": item.isVeg,
                "isDiscountApplicable": item.isDiscountApplicable,
                "measurementGroupId": item.measurementGroupId,
                "pricing": item.pricing,
                "menuPic": item.menuPic
            }
        });

        if (Object.keys(editMenu).length > 0) {
            getSubCategories(editMenu.categoryId);
            bindUnits(editMenu.measurementGroupId);

            const pricingValue = {};
            editMenu.pricing.forEach((item) => {
                pricingValue[item.unitId] = {
                    "tablePrice": item.tablePrice,
                    "takeAwayPrice": item.takeAwayPrice,
                    "deliveryPrice": item.deliveryPrice
                }
            });

            setState(prevState => ({
                ...prevState,
                "id": editMenu.id,
                "categoryId": editMenu.categoryId,
                "subCategoryId": editMenu.subCategoryId,
                "itemCode": editMenu.itemCode,
                "name": editMenu.name,
                "gst": editMenu.gst,
                "description": editMenu.description,
                "isVeg": editMenu.isVeg,
                "isDiscountApplicable": editMenu.isDiscountApplicable,
                "menuPic": editMenu.menuPic,
                "measurementGroupId": editMenu.measurementGroupId,
                "pricing": pricingValue,
                "buttonText": "Update"
            }));
        };
    };

    const onChange = (e) => {
        const { id, value } = e.target;

        if (id === "categoryId") {
            getSubCategories(value);
        }
        else if (id === "measurementGroupId") {
            bindUnits(value);
        }

        const finalErrorMessages = Validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: id !== "isVeg" && id !== "isDiscountApplicable" ? value : e.target.checked,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    };

    const onPricingChange = (e, unitId) => {
        const { id, value } = e.target;

        setState(prevState => ({
            ...prevState,
            pricing: {
                ...prevState.pricing,
                [unitId]: {
                    ...prevState.pricing[unitId],
                    [id]: value
                }
            }
        }));
    };

    const bindUnits = (measurementGroupId) => {
        if (parseInt(measurementGroupId) > 0) {
            const units = measuringUnits.filter((unit) =>
                (unit.id === parseInt(measurementGroupId))
            );

            if (units.length > 0) {
                setState(prevState => ({
                    ...prevState,
                    units: units[0].measuringUnit
                }));
            }
        }
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const categoryId = id && id === "categoryId" ? value : state.categoryId;
        const itemCode = id && id === "itemCode" ? value : state.itemCode;
        const name = id && id === "name" ? value : state.name;
        const gst = id && id === "gst" ? value : state.gst;
        const measurementGroupId = id && id === "measurementGroupId" ? value : state.measurementGroupId;

        if (!doesHaveValue(categoryId)) {
            finalErrorMessages.categoryId = ErrorMessages.CategorySelectionRequired;
        }

        if (!doesHaveValue(itemCode)) {
            finalErrorMessages.itemCode = ErrorMessages.ItemCodeRequired;
        }
        else if (!isValidAlphaNumeric(itemCode)) {
            finalErrorMessages.itemCode = ErrorMessages.ValidAlphanumeric;
        }

        if (!doesHaveValue(name)) {
            finalErrorMessages.name = ErrorMessages.MenuNameRequired;
        }
        else if (!isValidAlphaNumeric(name)) {
            finalErrorMessages.name = ErrorMessages.ValidAlphanumeric;
        }

        if (!doesHaveValue(gst)) {
            finalErrorMessages.gst = ErrorMessages.GSTRequired;
        }
        else if (!isValidPrice(gst)) {
            finalErrorMessages.gst = ErrorMessages.ValidGST;
        }

        if (!doesHaveValue(measurementGroupId)) {
            finalErrorMessages.measurementGroupId = ErrorMessages.MeasuringUnitRequired;
        }

        return finalErrorMessages;
    };

    const onEditMenuPic = () => {
        inputMenuPic.current.click();
    };

    const onMenuPicSelect = () => {
        const file = inputMenuPic.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const base64Image = reader.result;

            const payload = {
                "Menu": {
                    "ID": state.id,
                },
                "AWSImages": {
                    "ImageType": ImageTypes.MenuPic,
                    "Image": base64Image.split(",")[1]
                }
            };

            const successMessage = SuccessMessages.MenuPicUpdated;

            const onSuccess = (response) => {
                setState(prevState => ({
                    ...prevState,
                    menuPic: response.data
                }));
            };

            dispatch(updateMenuPic({
                params: payload,
                successMessage,
                onSuccess,
                dispatch
            }));
        }
    };

    const onMenuSave = (e) => {
        e.preventDefault();
        if (state.id === 0) {
            SaveMenu();
        }
        else {
            UpdateMenu();
        }
    };

    const SaveMenu = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const finalPricing = [];
            Object.keys(state.pricing).forEach((unitId) => {
                if (state.pricing[unitId].tablePrice && state.pricing[unitId].takeAwayPrice && state.pricing[unitId].deliveryPrice) {
                    finalPricing.push({
                        "unitId": parseInt(unitId),
                        "tablePrice": parseInt(state.pricing[unitId].tablePrice),
                        "takeAwayPrice": parseInt(state.pricing[unitId].takeAwayPrice),
                        "deliveryPrice": parseInt(state.pricing[unitId].deliveryPrice)
                    });
                }
            });

            const payload = {
                "CollectionName": "Menu",
                "Menu": {
                    "SubCategoryId": parseInt(state.subCategoryId),
                    "ItemCode": state.itemCode,
                    "Name": state.name,
                    "GST": parseFloat(state.gst),
                    "Description": state.description,
                    "IsVeg": state.isVeg,
                    "IsDiscountApplicable": state.isDiscountApplicable,
                    "MenuPic": state.menuPic,
                    "MeasurementGroupId": parseInt(state.measurementGroupId),
                    "Pricing": finalPricing
                }
            };

            const successMessage = SuccessMessages.MenuSaved;

            const onSuccess = () => {
                props.history.push('/admin/menu');
            };

            dispatch(saveMenu({
                params: payload,
                successMessage,
                onSuccess,
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

    const UpdateMenu = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {

            const finalPricing = [];
            Object.keys(state.pricing).forEach((unitId) => {
                if (state.pricing[unitId].tablePrice && state.pricing[unitId].takeAwayPrice && state.pricing[unitId].deliveryPrice) {
                    finalPricing.push({
                        "unitId": parseInt(unitId),
                        "tablePrice": parseInt(state.pricing[unitId].tablePrice),
                        "takeAwayPrice": parseInt(state.pricing[unitId].takeAwayPrice),
                        "deliveryPrice": parseInt(state.pricing[unitId].deliveryPrice)
                    });
                }
            });

            const payload = {
                "CollectionName": "Menu",
                "Menu": {
                    "ID": state.id,
                    "SubCategoryId": parseInt(state.subCategoryId),
                    "ItemCode": state.itemCode,
                    "Name": state.name,
                    "GST": parseFloat(state.gst),
                    "Description": state.description,
                    "IsVeg": state.isVeg,
                    "IsDiscountApplicable": state.isDiscountApplicable,
                    "MeasurementGroupId": parseInt(state.measurementGroupId),
                    "Pricing": finalPricing
                }
            };

            const successMessage = SuccessMessages.MenuUpdated;

            const onSuccess = () => {
                props.history.push('/admin/menu');
            };

            dispatch(updateMenu({
                params: payload,
                successMessage,
                onSuccess,
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

    const onMenuBack = (e) => {
        e.preventDefault();
        props.history.push("Menu");
    };

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <AddMenuComp
                id={state.id}
                categoryId={state.categoryId}
                subCategoryId={state.subCategoryId}
                itemCode={state.itemCode}
                name={state.name}
                measurementGroupId={state.measurementGroupId}
                gst={state.gst}
                description={state.description}
                isVeg={state.isVeg}
                isDiscountApplicable={state.isDiscountApplicable}
                menuPic={state.menuPic}
                buttonText={state.buttonText}
                errorMessages={state.errorMessages}
                onChange={onChange}
                onPricingChange={onPricingChange}
                categories={categories}
                subCategories={subCategories}
                measuringUnits={measuringUnits}
                units={state.units}
                pricing={state.pricing}
                inputMenuPic={inputMenuPic}
                onEditMenuPic={onEditMenuPic}
                onMenuPicSelect={onMenuPicSelect}
                onMenuSave={onMenuSave}
                onMenuBack={onMenuBack}
            />
        );
    }
};

export default AddMenu;