import React from "react";
import {
    Button,
    Row,
    Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Modal from "../AppComponents/Modal/Modal";
import AddCustomer from "../../container/Customers/AddCustomer";

const CustomerSummary = (props) => {

    return (
        <>
            <Row>
                <Col lg="12" className="p-1 pl-4 pr-4 font-weight-bold small">
                    Payment Mode:
                    <select
                        id="paymentMode"
                        className="form-control form-control-alternative"
                        value={props.paymentMode}
                        onChange={props.onSelectChange}
                    >
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col lg="8" className="p-1 pl-4">
                    <Input
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
                        onClick={props.onCustomerSearch}
                    >
                        <i className="fa fa-search"></i>
                    </Button>
                </Col>
            </Row>
            {
                Object.keys(props.customerInfo).length > 0 &&
                <Row>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2" />
                            {props.customerInfo.name}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2" />
                            {props.customerInfo.mobileNumber}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2" />
                            {props.customerInfo.emailID}
                        </div>
                    </Col>
                    <Col lg="12" className="pl-4 ">
                        <div className="h5 font-weight-400">
                            <i className="ni business_briefcase-24 mr-2" />
                            <span className="pr-1">{props.customerInfo.address}</span>
                            <span className="pr-1">{props.customerInfo.city}</span>
                            <span className="pr-1">{props.customerInfo.state}</span>
                            <span className="pr-1">{props.customerInfo.zipCode}</span>
                        </div>
                    </Col>
                </Row>
            }
            {
                <Modal
                    title="Add Customer"
                    className="modal-dialog-centered modal-popup-800"
                    showModal={props.showModal}
                    switchModal={props.switchModal}
                    formComponent={<AddCustomer tableNumber={props.tableNumber} />}
                />
            }
        </>
    )
};

export default CustomerSummary;