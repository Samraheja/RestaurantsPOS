import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettleBillComp from "../../components/SettleBill/SettleBill";
import { AlertTypes, BillSettlementDefaults, ErrorMessages, SuccessMessages } from "../../constants/apiConstants";
import { getVendors, getPaymentModes, settleBill, settleBillDetails } from "../../redux-store/actions/settleBill";
import { doesHaveValue, isDigitsOnly, isValidDigits } from "../../utils/functions";
import { addAlert } from "../../redux-store/actions/alert";
import { toggleModal } from "../../redux-store/actions/modal";
import { getOrderItemsList } from "../../redux-store/actions/order";
import { getTablesStatus } from "../../redux-store/actions/tables";
import { getDailySaleDetails } from "../../redux-store/actions/profile";

const SettleBill = (props) => {
    const [state, setState] = useState({
        ...BillSettlementDefaults
    });

    const dispatch = useDispatch();
    const { vendors, paymentModes } = useSelector(state => state.settleBill);
    const { billingDetails } = useSelector(state => state.order);

    useEffect(() => {
        bindVendors();
        bindPaymentModes();

        if (props.billId !== undefined && props.billId > 0) {
            const payload = {
                "CollectionName": "Billing",
                "Id": parseInt(props.billId)
            };

            const onSuccess = (response) => {
                setState((prevState) => ({
                    ...prevState,
                    billId: props.billId,
                    remainingAmount: response.data.netAmount
                }));
            }

            dispatch(getOrderItemsList({
                params: payload,
                onSuccess,
                dispatch
            }));
        }
        else {
            dispatch(toggleModal());
        }
    }, []);

    const bindVendors = () => {
        const payload = {
            CollectionName: "Vendors"
        };

        const onSuccess = (response) => {
            setState((prevState) => ({
                ...prevState,
                vendorId: response.data.response[0].id,
                vendor: response.data.response[0].name
            }));
        };

        dispatch(getVendors({
            params: payload,
            onSuccess,
            dispatch
        }));
    };

    const bindPaymentModes = () => {
        const payload = {
            CollectionName: "PaymentModes"
        };

        const onSuccess = (response) => {
            setState((prevState) => ({
                ...prevState,
                paymentModeId: response.data.response[0].id,
                paymentMode: response.data.response[0].mode
            }));
        };

        dispatch(getPaymentModes({
            params: payload,
            onSuccess,
            dispatch
        }));
    };

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = Validate(id, value);

        if (id === "vendorId") {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                "vendor": e.target.selectedOptions[0].text,
                "amount": e.target.selectedOptions[0].text !== "Self" ? billingDetails.netAmount : "0"
            }));
        }
        else if (id === "paymentModeId") {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                "paymentMode": e.target.selectedOptions[0].text,
                "amount": e.target.selectedOptions[0].text === "Payment Due" ? billingDetails.netAmount : "0"
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                errorMessages: {
                    ...prevState.errorMessages,
                    [id]: finalErrorMessages[id]
                }
            }));
        }
    };

    const Validate = (id, value) => {
        const finalErrorMessages = {}

        const amount = id && id === "amount" ? value : state.amount;

        if (!doesHaveValue(amount)) {
            finalErrorMessages.amount = ErrorMessages.AmountRequired;
        }
        else if (!isDigitsOnly(amount)) {
            finalErrorMessages.amount = ErrorMessages.DigitsOnly;
        }
        else if (!isValidDigits(amount)) {
            finalErrorMessages.amount = ErrorMessages.ValidAmount;
        }

        return finalErrorMessages;
    }

    const onPaymentAdd = (e) => {
        e.preventDefault();
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const totalAmount = state.paymentDetails.reduce((prev, curr) => prev = prev + parseInt(curr.amount), 0) + parseInt(state.amount);

            const details = {};
            details.vendor = state.vendor;
            details.vendorId = state.vendorId;
            details.paymentMode = state.paymentMode;
            details.paymentModeId = state.paymentModeId;
            details.transactionNumber = state.transactionNumber;
            details.amount = state.amount

            setState((prevState) => ({
                ...prevState,
                vendorId: vendors[0].id,
                vendor: vendors[0].name,
                paymentModeId: paymentModes[0].id,
                paymentMode: paymentModes[0].mode,
                transactionNumber: "",
                amount: 0,
                remainingAmount: billingDetails.netAmount - totalAmount,
                tenderedAmount: totalAmount,
                returnToCustomer: totalAmount > billingDetails.netAmount ? totalAmount - billingDetails.netAmount : 0,
                paymentDetails: [
                    ...state.paymentDetails,
                    details
                ]
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    const onSettleBill = () => {
        if (state.paymentDetails.length > 0) {
            const totalAmount = state.paymentDetails.reduce((prev, curr) => prev = prev + parseInt(curr.amount), 0);

            if (totalAmount <= billingDetails.netAmount) {
                for (var i = 0; i < state.paymentDetails.length; i++) {
                    const payload = {
                        "CollectionName": "BillSettlement",
                        "BillSettlement": {
                            "BillId": parseInt(state.billId),
                            "VendorId": parseInt(state.paymentDetails[i].vendorId),
                            "PaymentModeId": parseInt(state.paymentDetails[i].paymentModeId),
                            "TransactionNumber": state.paymentDetails[i].transactionNumber,
                            "Amount": parseFloat(state.paymentDetails[i].amount)
                        }
                    };

                    const successMessage = SuccessMessages.BillSettled;

                    const onSuccess = (response) => {
                        const payload = {
                            CollectionName: "Tables"
                        };

                        dispatch(getTablesStatus({
                            params: payload,
                            dispatch
                        }));

                        const result = parseInt(response.data);

                        if (result < 0) {
                            dispatch(addAlert({
                                alertType: AlertTypes.Danger,
                                message: ErrorMessages.NotSettled
                            }));
                        }

                        const payloadSale = {
                            CollectionName: "DailySales"
                        }

                        dispatch(getDailySaleDetails({
                            params: payloadSale,
                            dispatch
                        }));
                    }

                    dispatch(settleBillDetails({
                        params: payload,
                        successMessage,
                        onSuccess,
                        dispatch
                    }));

                    dispatch(toggleModal());
                };
            }
            else {
                dispatch(addAlert({
                    alertType: AlertTypes.Danger,
                    message: ErrorMessages.AmountCheck
                }));
            }
        }
        else {
            dispatch(addAlert({
                alertType: AlertTypes.Danger,
                message: ErrorMessages.AddPayment
            }));
        }
    };

    return (
        <SettleBillComp
            vendorId={state.vendorId}
            vendor={state.vendor}
            paymentModeId={state.paymentModeId}
            paymentMode={state.paymentMode}
            transactionNumber={state.transactionNumber}
            amount={state.amount}
            remainingAmount={state.remainingAmount}
            tenderedAmount={state.tenderedAmount}
            returnToCustomer={state.returnToCustomer}
            errorMessages={state.errorMessages}
            onChange={onChange}
            vendors={vendors}
            paymentModes={paymentModes}
            billingDetails={billingDetails}
            paymentDetails={state.paymentDetails}
            onPaymentAdd={onPaymentAdd}
            onSettleBill={onSettleBill}
        />
    );
};

export default SettleBill;