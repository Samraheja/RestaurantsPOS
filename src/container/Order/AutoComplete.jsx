import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import AutoCompleteComp from "../../components/Order/AutoComplete";
import {AutoCompleteDefaults, ErrorMessages, GlobalConstants} from "../../constants/constants";
import {getMenu} from "../../redux-store/actions/menu";
import {doesHaveValue, isValidAlphaNumeric, isValidQuantity} from "../../utils/functions";

const MostOrdered = (props) => {
    const [state, setState] = useState({
        ...AutoCompleteDefaults
    });

    const dispatch = useDispatch();
    const {menu, isLoading} = useSelector(state => state.menu);

    useEffect(() => {
        if (menu.length === 0) {
            const payload = {
                CollectionName: "Menu",
                Limit: GlobalConstants.Limit,
                SearchValue: ""
            };

            dispatch(getMenu({
                params: payload,
                dispatch
            }));
        }
    }, [menu.length, dispatch]);

    const onChange = (e) => {
        const {id, value} = e.target;

        if (id === "searchItem") {
            filterMenu(id, value);
        } else {
            setState(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const filterMenu = (id, value) => {
        setState(prevState => ({
            ...prevState,
            [id]: value,
            filteredMenu: value !== "" ? menu.filter(item => (item.name.toLowerCase().includes(value.toLowerCase()) || item.itemCode.toLowerCase().includes(value.toLowerCase()))) : [],
            suggestionBoxClass: "autoCompleteItemBox"
        }));
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const searchItem = id && id === "searchItem" ? value : state.searchItem;
        const quantity = id && id === "quantity" ? value : state.quantity;

        if (!doesHaveValue(searchItem)) {
            finalErrorMessages.searchItem = ErrorMessages.MenuNameRequired;
        } else if (!isValidAlphaNumeric(searchItem)) {
            finalErrorMessages.searchItem = ErrorMessages.ValidAlphanumeric;
        }

        if (!doesHaveValue(quantity)) {
            finalErrorMessages.quantity = ErrorMessages.QuantityRequired;
        } else if (!isValidQuantity(quantity)) {
            finalErrorMessages.quantity = ErrorMessages.ValidQuantity;
        }

        return finalErrorMessages;
    };

    const onItemClick = (id, name, pricing) => {
        setState((prevState) => ({
            ...prevState,
            itemId: id,
            searchItem: name,
            quantity: 1,
            pricing: pricing,
            suggestionBoxClass: "autoCompleteItemBox d-none"
        }));
    };

    const onAddButtonClick = () => {
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            props.onMenuItemAdd(state.itemId, state.pricing, state.quantity);
            
            setState((prevState) => ({
                ...prevState,
                itemId: AutoCompleteDefaults.itemId,
                searchItem: AutoCompleteDefaults.searchItem,
                quantity: AutoCompleteDefaults.quantity,
                pricing: AutoCompleteDefaults.pricing
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    }

    if (isLoading) {
        return <Loader/>
    } else {
        return (
            <AutoCompleteComp
                itemId={state.itemId}
                searchItem={state.searchItem}
                quantity={state.quantity}
                pricing={state.pricing}
                filteredMenu={state.filteredMenu}
                errorMessages={state.errorMessages}
                onChange={onChange}
                onItemClick={onItemClick}
                onAddButtonClick={onAddButtonClick}
                suggestionBoxClass={state.suggestionBoxClass}
            />
        );
    }
};

export default MostOrdered;