import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/AppComponents/Loader/Loader";
import { SettleDuesDefaults, ErrorMessages, GlobalConstants, SuccessMessages } from "../../constants/constants";
import SettleDuesComp from "../../components/SettleBill/SettleDues";
import { getPaymentModes, getSettledBills } from '../../redux-store/actions/settleBill';
import { settleDues } from '../../redux-store/actions/customer';
import { doesHaveValue, isValidDecimalOnly, isValidDigits } from '../../utils/functions';

const SettleDues = (props) => {
    const [state, setState] = useState({
        ...SettleDuesDefaults
    });

    const dispatch = useDispatch();
    const { customers } = useSelector(state => state.customer);
    const { paymentModes } = useSelector(state => state.settleBill);
    const { totalRecords, totalPages, settledBills, isSettledLoading } = useSelector(state => state.settleBill);

    useEffect(() => {
        const customerId = props.history.location.state;
        const customer = customers.filter(x => x.id == customerId);

        if (customerId > 0 && customers.length > 0) {
            bindPaymentModes();
            getBillByCustomerId(customerId);

            setState(prevState => ({
                ...prevState,
                customerId,
                customer: customer[0],
                settlementAmount: customer[0].dueAmount
            }));
        }
        else {
            props.history.push("/admin/customers");
        }
    }, [state.pageNo, state.sortBy, state.order, dispatch]);

    const bindPaymentModes = () => {
        if (paymentModes.length === 0) {
            const payload = {
                CollectionName: "PaymentModes"
            };

            const onSuccess = (response) => {
                setState((prevState) => ({
                    ...prevState,
                    paymentModeId: response.data.response[0].id
                }));
            };

            dispatch(getPaymentModes({
                params: payload,
                onSuccess,
                dispatch
            }));
        }
    };

    const getBillByCustomerId = (customerId) => {
        const payload = {
            CollectionName: "BillSettlement",
            Operation: "BillsByCustomers",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            Id: customerId
        };

        dispatch(getSettledBills({
            params: payload,
            dispatch
        }));
    }

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

        const amount = id && id === "settlementAmount" ? value : state.settlementAmount;

        if (!doesHaveValue(amount)) {
            finalErrorMessages.amount = ErrorMessages.AmountRequired;
        } else if (!isValidDecimalOnly(amount)) {
            finalErrorMessages.amount = ErrorMessages.DigitsOnly;
        } else if (!isValidDigits(amount)) {
            finalErrorMessages.amount = ErrorMessages.ValidAmount;
        }

        return finalErrorMessages;
    };

    const SortRecords = (column) => {
        setState(prevState => ({
            ...prevState,
            sortBy: column,
            order: prevState.sortBy == column ? state.order == "asc" ? "desc" : "asc" : "asc"
        }));
    };

    const onPageChange = (newPageNo) => {
        setState(prevState => ({
            ...prevState,
            pageNo: parseInt(newPageNo)
        }));
    };

    const onSettleAmount = () => {
        const payload = {
            "CollectionName": "DuesSettlement",
            "DuesSettlement": {
                "CustomerId": parseInt(state.customer.id),
                "PaymentModeId": parseInt(state.paymentModeId),
                "Amount": parseFloat(state.settlementAmount)
            }
        }

        const successMessage = SuccessMessages.DuesSettled;

        const onSuccess = () => {
            setState(prevState => ({
                ...prevState,
                settlementAmount: state.customer.dueAmount - state.settlementAmount
            }));
        }

        dispatch(settleDues({
            params: payload,
            successMessage,
            onSuccess,
            dispatch
        }));
    };

    const onBack = () => {
        props.history.push("/admin/customers");
    };

    if (isSettledLoading) {
        return <Loader />
    }
    else {
        return (
            <SettleDuesComp
                customer={state.customer}
                paymentModes={paymentModes}
                paymentModeId={state.paymentModeId}
                settlementAmount={state.settlementAmount}
                onChange={onChange}
                errorMessages={state.errorMessages}
                onSettleAmount={onSettleAmount}
                onBack={onBack}
                totalRecords={totalRecords}
                totalPages={totalPages}
                settledBills={settledBills}
                pageNo={state.pageNo}
                SortRecords={SortRecords}
                onPageChange={onPageChange}
            />
        )
    }
}

export default SettleDues;