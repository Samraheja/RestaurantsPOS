import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Modal
} from "reactstrap";

const ShowModal = (props) => {

    const { showModal } = useSelector(state => state.modal);

    return (
        <Modal
            className={props.className || "modal-dialog-centered" }
            isOpen={showModal}
            toggle={() => props.switchModal()}
        >
            <div className="modal-header bg-lighter">
                <h4 className="modal-title pt-2">
                    {props.title}
                </h4>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => props.switchModal()}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                {props.formComponent}
            </div>
        </Modal>
    )
};

export default ShowModal;