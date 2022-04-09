import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import { AccountBookDefaults } from "../../constants/constants";
import { getAccountBook, getAccountDetails } from "../../redux-store/actions/accounts";
import AccountBookComp from "../../components/Accounts/AccountBook";

const AccountBook = (props) => {
    const [state, setState] = useState({
        ...AccountBookDefaults
    });

    const dispatch = useDispatch();
    const { accountBook, isLoading } = useSelector(state => state.accounts);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const payload = {
            "CollectionName": "AccountBook"
        };

        dispatch(getAccountBook({
            params: payload,
            dispatch
        }));
    }, [state.ledger, dispatch]);

    const getAccountDetailsByAccountId = (accountId) => {
        if (parseInt(accountId) > 0) {
            const payload = {
                "CollectionName": "AccountDetails",
                "Id": parseInt(accountId)
            };

            const onSuccess = (response) => {
                setState(prevState => ({
                    ...prevState,
                    ledger: response.data.response
                }));
            }

            dispatch(getAccountDetails({
                params: payload,
                onSuccess,
                dispatch
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                ledger: AccountBookDefaults.ledger
            }));
        }
    }

    const onChange = (e) => {
        const { id, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [id]: value
        }));

        getAccountDetailsByAccountId(value);
    };

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <AccountBookComp
                accountId={state.accountId}
                accountBook={accountBook}
                onChange={onChange}
                messagesEndRef={messagesEndRef}
                ledger={state.ledger}
            />
        );
    }
};

export default AccountBook;