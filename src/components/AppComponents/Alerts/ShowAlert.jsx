import React, { useState, useEffect } from "react";
import { AlertTypes } from "../../../constants/apiConstants";
import {
    Alert
} from "reactstrap";
import "./ShowAlert.css";
import { deleteAlert } from "../../../redux-store/actions/alert";
import { useDispatch } from "react-redux";

const ShowAlert = (props) => {
    const [state, setState] = useState({
        visible: true
    });

    const dispatch = useDispatch();

    useEffect(() => {
        state.visible && window.setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                visible: false
            }));

            dispatch(deleteAlert());
        }, 5000);
    }, [state.visible, dispatch]);

    const Type = {
        [AlertTypes.Success]: {
            color: "success",
            icon: "fas fa-thumbs-up"
        },
        [AlertTypes.Info]: {
            color: "info",
            icon: "fas fa-info-circle"
        },
        [AlertTypes.Warning]: {
            color: "warning",
            icon: "fas fa-exclamation-triangle"
        },
        [AlertTypes.Danger]: {
            color: "danger",
            icon: "fas fa-exclamation-circle"
        },
        Default: {
            color: "info",
            icon: "fas fa-info-circle"
        }
    }

    return (
        <Alert isOpen={state.visible} className="AnimatedAlert"
            color={props.alertType && Type[props.alertType] ? Type[props.alertType].color : Type.Default.color}>
            <span className="alert-inner--icon">
                <i className={props.alertType && Type[props.alertType] ? Type[props.alertType].icon : Type.Default.icon} />
            </span>{" "}
            <span className="alert-inner--text pl-1">
                {props.message}
            </span>
        </Alert>
    );
};

export default ShowAlert;