import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettleBillComp from "../../components/SettleBill/SettleBill";
import { AlertTypes, BillSettlementDefaults, ErrorMessages, SuccessMessages } from "../../constants/apiConstants";
import { getVendors, getPaymentModes, settleBill, settleBillDetails } from "../../redux-store/actions/settleBill";
import { doesHaveValue, isDigitsOnly, isValidDigits } from "../../utils/functions";
import { addAlert } from "../../redux-store/actions/alert";

const SettleBill = (props) => {
    const [state, setState] = useState({
        ...BillSettlementDefaults
    });

    const dispatch = useDispatch();
    const { vendors, paymentModes } = useSelector(state => state.settleBill);

    useEffect(() => {
        bindVendors();
        bindPaymentModes();

        if (props.billId !== undefined && props.billId > 0) {
            setState((prevState) => ({
                ...prevState,
                billId: props.billId
            }));
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

        dispatch(getPaymentModes({
            params: payload,
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
                "vendor": e.target.selectedOptions[0].text
            }));
        }
        else if (id === "paymentModeId") {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                "paymentMode": e.target.selectedOptions[0].text
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

        const paymentModeId = id && id === "paymentModeId" ? value : state.paymentModeId;
        const amount = id && id === "amount" ? value : state.amount;

        if (!doesHaveValue(paymentModeId)) {
            finalErrorMessages.paymentModeId = ErrorMessages.PaymentModeRequired;
        }

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
                paymentModeId: 0,
                paymentMode: "",
                transactionNumber: "",
                amount: 0,
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
                    const result = parseInt(response.data);

                    if (result < 0) {
                        dispatch(addAlert({
                            alertType: AlertTypes.Danger,
                            message: ErrorMessages.NotSettled
                        }));
                    }
                }

                dispatch(settleBillDetails({
                    params: payload,
                    successMessage,
                    onSuccess,
                    dispatch
                }));
            };
        }
        else {
            dispatch(addAlert({
                alertType: AlertTypes.Danger,
                message: "Please add payment details"
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
            errorMessages={state.errorMessages}
            onChange={onChange}
            tableNumber={props.tableNumber}
            billNumber={props.billNumber}
            netAmount={props.netAmount}
            vendors={vendors}
            paymentModes={paymentModes}
            paymentDetails={state.paymentDetails}
            onPaymentAdd={onPaymentAdd}
            onSettleBill={onSettleBill}
        />
    );
};

export default SettleBill;