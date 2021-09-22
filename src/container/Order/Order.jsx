import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import OrderComp from "../../components/Order/Order";
import { AlertTypes, ErrorMessages, OrdersDefault, SuccessMessages } from "../../constants/apiConstants";
import { completeOrder, getOrderItemsList, saveOrderItem, updateQuantity } from "../../redux-store/actions/order"
import { addAlert } from "../../redux-store/actions/alert";

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
                billId: parseInt(billId)
            }));

            if (billId > 0) {
                const payload = {
                    CollectionName: "Orders",
                    "Orders": {
                        "BillId": parseInt(billId)
                    }
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
    }, [customerInfo, orderedItems.length]);

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
                "TableNumber": parseInt(billingDetails.tableNumber),
                "MenuId": parseInt(menuId),
                "OrderType": billingDetails.orderType,
                "Price": parseFloat(price),
                "Quantity": parseInt(quantity)
            }
        };

        const successMessage = SuccessMessages.ItemAdded;

        dispatch(saveOrderItem({
            params: payload,
            successMessage,
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

        dispatch(updateQuantity({
            params: payload,
            dispatch
        }));
    }

    const onCompleteOrder = () => {
        if (Object.keys(customerInfo).length > 0) {
            const payload = {
                CollectionName: "Billing",
                "Billing": {
                    "ID": parseInt(billingDetails.id),
                    "Discount": state.discount === "" ? 0 : parseFloat(state.discount)
                }
            };

            const successMessage = SuccessMessages.OrderCompleted;

            const onSuccess = () => {
                props.history.push("/admin/order");
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