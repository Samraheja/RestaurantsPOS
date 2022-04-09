import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import { DayBookDefaults, GlobalConstants } from "../../constants/constants";
import { getDayBook } from "../../redux-store/actions/accounts";
import DayBookComp from "../../components/Accounts/DayBook";

const DayBook = (props) => {
    const [state, setState] = useState({
        ...DayBookDefaults
    });
    
    const dispatch = useDispatch();
    const { dayBook, isLoading } = useSelector(state => state.accounts);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        const payload = {
            "CollectionName": "Ledger",
            "Ledger": {
                "Date": state.date
            }
        };

        const onSuccess = () => {
            setTimeout(()=> {
                scrollToBottom();
            }, 0)
        }

        dispatch(getDayBook({
            params: payload,
            onSuccess,
            dispatch
        }));
    }, [state.date, dispatch]);

    const onChange = (e) => {
        const { id, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <DayBookComp
                date={state.date}
                dayBook={dayBook}
                onChange={onChange}
                messagesEndRef={messagesEndRef}
            />
        );
    }
};

export default DayBook;