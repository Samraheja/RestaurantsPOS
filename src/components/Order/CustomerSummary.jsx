import React from "react";
import {
    Button,
    Row,
    Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Modal from "../AppComponents/Modal";
import AddCustomer from "../../container/Customers/AddCustomer";
import localizedStrings from '../../constants/localizations'

const {
    addCustomerLabel
} = localizedStrings;

const CustomerSummary = (props) => {
    const onSearchClick = (e) => {
        props.onCustomerSearch(e)
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearchClick(e)
        }
    };
    return (
        <>
            <Row>
                <Col lg="8" className="p-1 pl-4">
                    <Input
                        onKeyPress={onKeyPress}
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        type="text"
                        className="form-control-alternative"
                        value={props.mobileNumber}
                        onChange={props.onChange}
                        error={props.errorMessages.mobileNumber}
                    />
                </Col>
                <Col lg="4" className="p-1">
                    <Button
                        color="danger"
                        type="button"
                        onClick={onSearchClick}
                    >
                        <i className="fa fa-search"/>
                    </Button>
                </Col>
            </Row>
            {
                Object.keys(props.customerInfo).length > 0 &&
                <Row>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2"/>
                            {props.customerInfo.name}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2"/>
                            {props.customerInfo.mobileNumber}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2"/>
                            {props.customerInfo.emailID}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4 ">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2"/>
                            <span className="pr-1">{props.customerInfo.address}</span>
                            <span className="pr-1">{props.customerInfo.city}</span>
                            <span className="pr-1">{props.customerInfo.state}</span>
                            <span className="pr-1">{props.customerInfo.zipCode}</span>
                        </div>
                    </Col>
                </Row>
            }
            <Modal
                isActive={props.isAddCustomerVisible}
                title={addCustomerLabel}
                className="modal-dialog-centered modal-popup-800"
                switchModal={props.switchModal}
                renderScene={<AddCustomer switchModal={props.switchModal} billId={props.billId}
                                          mobileNumber={props.mobileNumber}/>}
            />
        </>
    )
};

export default CustomerSummary;