import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettleBillComp from "../../components/SettleBill/SettleBill";
import { AlertTypes, BillSettlementDefaults, ErrorMessages, SuccessMessages } from "../../constants/constants";
import {
    getVendors,
    getPaymentModes,
    GetBillToSetlle,
    settleBillDetails,
    getSettledPaymentDetails
} from "../../redux-store/actions/settleBill";
import { doesHaveValue, isValidAlphaNumeric, isValidDecimalOnly, isValidDigits } from "../../utils/functions";
import { addAlert } from "../../redux-store/actions/alert";
import { getTablesStatus } from "../../redux-store/actions/tables";
import { getDailySaleDetails } from "../../redux-store/actions/profile";
import { paymentMode, vendorType } from "../../constants/constants";

const SettleBill = (props) => {
    const [state, setState] = useState({
        ...BillSettlementDefaults
    });

    const dispatch = useDispatch();
    const { vendors, paymentModes, billingDetails } = useSelector(state => state.settleBill);

    useEffect(() => {
        bindVendors();
        bindPaymentModes();

        if (props.billId !== undefined && props.billId > 0) {
            const payload = {
                "CollectionName": "Billing",
                "Operation": "Settle Bill",
                "Id": parseInt(props.billId)
            };

            const onSuccess = (response) => {
                setState((prevState) => ({
                    ...prevState,
                    billId: props.billId,
                    amount: response.data.netAmount,
                    remainingAmount: response.data.netAmount
                }));
            }

            dispatch(GetBillToSetlle({
                params: payload,
                onSuccess,
                dispatch
            }));

            if (billingDetails && billingDetails.isSettled) {
                GetSettledPayments();
            }
        } else {
            props.switchModal && props.switchModal();
        }
    }, [vendors, paymentModes, dispatch]);

    const setVendorDetails = ({vendor}) => {
        setState((prevState) => ({
            ...prevState,
            vendorId: vendor.id,
            vendor: vendor.name
        }));
    }

    const bindVendors = () => {
        if (vendors.length === 0) {
            const payload = {
                CollectionName: "Vendors"
            };
            const onSuccess = (response) => {
                setVendorDetails({vendor:response.data.response[0]});
            };

            dispatch(getVendors({
                params: payload,
                onSuccess,
                dispatch
            }));
        }else{
            setVendorDetails({vendor:vendors[0]});
        }
    };

    const bindPaymentModes = () => {
        if (paymentModes.length === 0) {
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
        }
    };

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = Validate(id, value);

        if (id === "vendorId") {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                "vendor": e.target.selectedOptions[0].text,
                "amount": e.target.selectedOptions[0].text !== vendorType.self ? billingDetails.netAmount : "0"
            }));
        } else if (id === "paymentModeId") {
            setState(prevState => ({
                ...prevState,
                [id]: value,
                "paymentMode": e.target.selectedOptions[0].text,
                "amount": e.target.selectedOptions[0].text === paymentMode.paymentDue ? state.remainingAmount : "0"
            }));
        } else {
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
        const transactionNumber = id && id === "transactionNumber" ? value : state.transactionNumber;

        if (doesHaveValue(transactionNumber)) {
            if (!isValidAlphaNumeric(transactionNumber)) {
                finalErrorMessages.transactionNumber = ErrorMessages.ValidAlphanumeric;
            }
        }

        if (!doesHaveValue(amount)) {
            finalErrorMessages.amount = ErrorMessages.AmountRequired;
        } else if (!isValidDecimalOnly(amount)) {
            finalErrorMessages.amount = ErrorMessages.DigitsOnly;
        } else if (!isValidDigits(amount)) {
            finalErrorMessages.amount = ErrorMessages.ValidAmount;
        }

        return finalErrorMessages;
    }

    const onPaymentAdd = (e) => {
        e.preventDefault();
        const finalErrorMessages = Validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const totalAmount = state.paymentDetails.filter(x => x.isDeleted === false).reduce((prev, curr) => prev = prev + parseFloat(curr.amount), 0) + parseFloat(state.amount);

            const details = {};
            details.id = 0;
            details.vendor = state.vendor;
            details.vendorId = state.vendorId;
            details.paymentMode = state.paymentMode;
            details.paymentModeId = state.paymentModeId;
            details.transactionNumber = state.transactionNumber;
            details.amount = state.amount;
            details.isDeleted = false

            setState((prevState) => ({
                ...prevState,
                vendorId: vendors[0].id,
                vendor: vendors[0].name,
                paymentModeId: paymentModes[0].id,
                paymentMode: paymentModes[0].mode,
                transactionNumber: "",
                amount: 0,
                remainingAmount: billingDetails.netAmount < totalAmount ? 0 : parseFloat(billingDetails.netAmount - totalAmount).toFixed(2),
                tenderedAmount: parseFloat(totalAmount),
                returnToCustomer: parseFloat(totalAmount) > parseFloat(billingDetails.netAmount) ? parseFloat(totalAmount - billingDetails.netAmount).toFixed(2) : 0,
                paymentDetails: [
                    ...state.paymentDetails,
                    details
                ]
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    };

    const onSettleBill = () => {
        if (state.paymentDetails.length > 0) {
            const totalAmount = state.paymentDetails.reduce((prev, curr) => prev = prev + parseInt(curr.amount), 2);

            if (totalAmount >= billingDetails.netAmount) {
                for (var i = 0; i < state.paymentDetails.length; i++) {
                    if (state.paymentDetails[i].id > 0) {
                        UpdateSettlementDetails(state.paymentDetails[i]);
                    } else {
                        SaveSettlementDetails(state.paymentDetails[i], i);
                    }
                }
                ;
                props.switchModal && props.switchModal();
            } else {
                dispatch(addAlert({
                    alertType: AlertTypes.Danger,
                    message: ErrorMessages.AmountCheck
                }));
            }
        } else {
            dispatch(addAlert({
                alertType: AlertTypes.Danger,
                message: ErrorMessages.AddPayment
            }));
        }
    };

    const SaveSettlementDetails = (details, index) => {
        const payload = {
            "CollectionName": "BillSettlement",
            "BillSettlement": {
                "BillId": parseInt(state.billId),
                "VendorId": parseInt(details.vendorId),
                "PaymentModeId": parseInt(details.paymentModeId),
                "TransactionNumber": details.transactionNumber,
                "Amount": parseFloat(details.amount),
                "IsDeleted": details.isDeleted,
                "ReturnedAmount": index === 0 ? parseFloat(state.returnToCustomer) : 0
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
    };

    const UpdateSettlementDetails = (details) => {
        const payload = {
            "CollectionName": "BillSettlement",
            "BillSettlement": {
                "Id": parseInt(details.id),
                "BillId": parseInt(state.billId),
                "VendorId": parseInt(details.vendorId),
                "PaymentModeId": parseInt(details.paymentModeId),
                "TransactionNumber": details.transactionNumber,
                "Amount": parseFloat(details.amount),
                "IsDeleted": details.isDeleted,
                "ReturnedAmount": parseFloat(state.returnToCustomer)
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
    };

    const onCancelSettlement = () => {
        props.switchModal && props.switchModal();
    };

    const onDeletePayment = (index) => {
        setState((prevState) => ({
            ...prevState,
            paymentDetails: state.paymentDetails.splice(index, 1)
        }));

        state.paymentDetails.splice(index, 1);
    };

    const GetSettledPayments = () => {
        const payload = {
            "CollectionName": "BillSettlement",
            "Operation": "Payment Details",
            "Id": parseInt(props.billId)
        };

        const onSuccess = (response) => {
            console.log(response);
        }

        dispatch(getSettledPaymentDetails({
            params: payload,
            onSuccess,
            dispatch
        }));
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
            onCancelSettlement={onCancelSettlement}
            onDeletePayment={onDeletePayment}
        />
    );
};

export default SettleBill;