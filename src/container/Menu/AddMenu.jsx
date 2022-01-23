import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import AddMenuComp from "../../components/Menu/AddMenu";
import { AddMenuDefaults, ErrorMessages, GlobalConstants, ImageTypes, SuccessMessages } from "../../constants/apiConstants";
import { getCategories } from "../../redux-store/actions/category";
import { getSubCategoriesByCategoryId } from "../../redux-store/actions/subCategory";
import { saveMenu, updateMenu, updateMenuPic } from "../../redux-store/actions/menu";
import { doesHaveValue, isValidAlphaNumeric, isValidPrice } from "../../utils/functions";

const AddMenu = (props) => {
    const [state, setState] = useState({
        ...AddMenuDefaults
    });

    const inputMenuPic = useRef(null);

    const dispatch = useDispatch();
    const { menu, isLoading } = useSelector(state => state.menu);
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
                "tablePrice": item.tablePrice,
                "takeAwayPrice": item.takeAwayPrice,
                "deliveryPrice": item.deliveryPrice,
                "gst": item.gst,
                "description": item.description,
                "isVeg": item.isVeg,
                "menuPic": item.menuPic
            }
        });

        if (Object.keys(editMenu).length > 0) {
            getSubCategories(editMenu.categoryId);

            setState(prevState => ({
                ...prevState,
                "id": editMenu.id,
                "categoryId": editMenu.categoryId,
                "subCategoryId": editMenu.subCategoryId,
                "itemCode": editMenu.itemCode,
                "name": editMenu.name,
                "tablePrice": parseInt(editMenu.tablePrice),
                "takeAwayPrice": editMenu.takeAwayPrice,
                "deliveryPrice": editMenu.deliveryPrice,
                "gst": editMenu.gst,
                "description": editMenu.description,
                "isVeg": editMenu.isVeg,
                "menuPic": editMenu.menuPic,
                "buttonText": "Update"
            }));
        };
    };

    const onChange = (e) => {
        const { id, value } = e.target;

        if (id === "categoryId") {
            getSubCategories(value);
        }

        const finalErrorMessages = Validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: id !== "isVeg" ? value : e.target.checked,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const categoryId = id && id === "categoryId" ? value : state.categoryId;
        const itemCode = id && id === "itemCode" ? value : state.itemCode;
        const name = id && id === "name" ? value : state.name;
        const tablePrice = id && id === "tablePrice" ? value : state.tablePrice;
        const takeAwayPrice = id && id === "takeAwayPrice" ? value : state.takeAwayPrice
        const deliveryPrice = id && id === "deliveryPrice" ? value : state.deliveryPrice;
        const gst = id && id === "gst" ? value : state.gst;

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

        if (!doesHaveValue(tablePrice)) {
            finalErrorMessages.tablePrice = ErrorMessages.TablePriceRequired;
        }
        else if (!isValidPrice(tablePrice)) {
            finalErrorMessages.tablePrice = ErrorMessages.ValidPrice;
        }

        if (!doesHaveValue(takeAwayPrice)) {
            finalErrorMessages.takeAwayPrice = ErrorMessages.TakeAwayPriceRequired;
        }
        else if (!isValidPrice(takeAwayPrice)) {
            finalErrorMessages.takeAwayPrice = ErrorMessages.ValidPrice;
        }

        if (!doesHaveValue(deliveryPrice)) {
            finalErrorMessages.deliveryPrice = ErrorMessages.DeliveryPriceRequired;
        }
        else if (!isValidPrice(deliveryPrice)) {
            finalErrorMessages.deliveryPrice = ErrorMessages.ValidPrice;
        }

        if (!doesHaveValue(gst)) {
            finalErrorMessages.gst = ErrorMessages.GSTRequired;
        }
        else if (!isValidPrice(gst)) {
            finalErrorMessages.gst = ErrorMessages.ValidGST;
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

            const payload = {
                "CollectionName": "Menu",
                "Menu": {
                    "SubCategoryId": parseInt(state.subCategoryId),
                    "ItemCode": state.itemCode,
                    "Name": state.name,
                    "TablePrice": parseFloat(state.tablePrice),
                    "TakeAwayPrice": parseFloat(state.takeAwayPrice),
                    "DeliveryPrice": parseFloat(state.deliveryPrice),
                    "GST": parseFloat(state.gst),
                    "Description": state.description,
                    "IsVeg": state.isVeg,
                    "MenuPic": state.menuPic
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

            const payload = {
                "CollectionName": "Menu",
                "Menu": {
                    "ID": state.id,
                    "SubCategoryId": parseInt(state.subCategoryId),
                    "ItemCode": state.itemCode,
                    "Name": state.name,
                    "TablePrice": parseFloat(state.tablePrice),
                    "TakeAwayPrice": parseFloat(state.takeAwayPrice),
                    "DeliveryPrice": parseFloat(state.deliveryPrice),
                    "GST": parseFloat(state.gst),
                    "Description": state.description,
                    "IsVeg": state.isVeg
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
                tablePrice={state.tablePrice}
                takeAwayPrice={state.takeAwayPrice}
                deliveryPrice={state.deliveryPrice}
                gst={state.gst}
                description={state.description}
                isVeg={state.isVeg}
                menuPic={state.menuPic}
                buttonText={state.buttonText}
                errorMessages={state.errorMessages}
                onChange={onChange}
                categories={categories}
                subCategories={subCategories}
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