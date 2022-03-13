import React from "react";
import { useSelector } from "react-redux";
import {
    Modal
} from "reactstrap";

const ShowModal = (props) => {

    return (
        <Modal
            className={props.className || "modal-dialog-centered" }
            isOpen={props.isActive}
            toggle={props.switchModal}
            autoFocus={false}
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
                    onClick={props.switchModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className={ props.bodyClassName || "modal-body" }>
                {props.renderScene}
            </div>
        </Modal>
    )
};

export default ShowModal;