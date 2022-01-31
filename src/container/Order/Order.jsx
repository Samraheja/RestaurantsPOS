import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import OrderComp from "../../components/Order/Order";
import { AlertTypes, ErrorMessages, OrdersDefault, SuccessMessages } from "../../constants/constants";
import { completeOrder, getOrderItemsList, saveOrderItem, updateQuantity } from "../../redux-store/actions/order"
import { addAlert } from "../../redux-store/actions/alert";
import { getDailySaleDetails } from "../../redux-store/actions/profile";

const Order = (props) => {
    const [state, setState] = useState({
        ...OrdersDefault
    });

    const dispatch = useDispatch();
    const { billingDetails, orderedItems, isLoading } = useSelector(state => state.order);
    const { customerInfo } = useSelector(state => state.customer);

    useEffect(() => {
        const billId = props.history.location.state;

        if (billId) {
            setState((prevState) => ({
                ...prevState,
                billId: parseInt(billId),
                buttonText: billingDetails.isKOTDone === false ? "Print KOT" : "Print Bill"
            }));

            if (billId > 0) {
                const payload = {
                    "CollectionName": "Billing",
                    "Id": parseInt(billId)
                };

                dispatch(getOrderItemsList({
                    params: payload,
                    dispatch
                }));
            };
        }
        else {
            props.history.push("/admin/tables")
        }
    }, [customerInfo, orderedItems && orderedItems.length]);

    const onChange = (e) => {
        const { id, value } = e.target;

        if (id !== "discount") {
            setState(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
        else {
            CalculateAmount(value);
        }
    };

    const onMenuItemAdd = (menuId, price, quantity) => {
        const payload = {
            CollectionName: "Orders",
            "Orders": {
                "BillId": parseInt(billingDetails.id),
                "MenuId": parseInt(menuId),
                "Price": parseFloat(price),
                "Quantity": parseInt(quantity)
            }
        };

        const successMessage = SuccessMessages.ItemAdded;

        const onSuccess = () => {
            const payloadSale = {
                CollectionName: "DailySales"
            }

            dispatch(getDailySaleDetails({
                params: payloadSale,
                dispatch
            }));
        }

        dispatch(saveOrderItem({
            params: payload,
            successMessage,
            onSuccess,
            dispatch
        }));
    }

    const onQuantityUpdate = (id, quantity, operation) => {
        const payload = {
            CollectionName: "Orders",
            "Orders": {
                "Id": parseInt(id),
                "Quantity": operation === "Add" ? parseInt(quantity) + 1 : parseInt(quantity) - 1
            }
        };

        const onSuccess = () => {
            const payloadSale = {
                CollectionName: "DailySales"
            }

            dispatch(getDailySaleDetails({
                params: payloadSale,
                dispatch
            }));
        }

        dispatch(updateQuantity({
            params: payload,
            onSuccess,
            dispatch
        }));
    }

    const onCompleteOrder = () => {
        if (Object.keys(customerInfo).length > 0 || !billingDetails.isKOTDone) {
            const payload = {
                CollectionName: "Billing",
                "Operation": billingDetails.isKOTDone === false ? "Print KOT" : "",
                "Billing": {
                    "ID": parseInt(billingDetails.id),
                    "Discount": state.discount === "" ? 0 : parseFloat(state.discount)
                }
            };

            const successMessage = billingDetails.isKOTDone === true ? SuccessMessages.OrderCompleted : "";

            const onSuccess = () => {
                if (billingDetails.isKOTDone) {
                    props.history.push("/admin/order");
                }
            }

            dispatch(completeOrder({
                params: payload,
                successMessage,
                onSuccess,
                dispatch
            }));
        }
        else {
            dispatch(addAlert({
                alertType: AlertTypes.Danger,
                message: ErrorMessages.SelectCustomer
            }));
        }
    }

    const CalculateAmount = (discount) => {
        const discountAmount = ((billingDetails.totalAmount * discount) / 100).toFixed(2);
        const netAmount = (billingDetails.totalAmount - discountAmount).toFixed(2);

        setState(prevState => ({
            ...prevState,
            discount: discount,
            discountAmount: discountAmount,
            netAmount: netAmount
        }));
    }

    return (
        <>
            {
                isLoading && <Loader />
            }
            <OrderComp
                billingDetails={billingDetails}
                orderedItems={orderedItems}
                onMenuItemAdd={onMenuItemAdd}
                onQuantityUpdate={onQuantityUpdate}
                onCompleteOrder={onCompleteOrder}
                customerInfo={customerInfo}
                buttonText={state.buttonText}
                paymentMode={state.paymentMode}
                discount={state.discount}
                discountAmount={state.discountAmount}
                netAmount={state.netAmount}
                onChange={onChange}
            >
            </OrderComp>
        </>
    );
};

export default Order;