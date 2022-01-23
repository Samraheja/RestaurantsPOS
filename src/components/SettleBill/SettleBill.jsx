import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
    Table
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Select from "../AppComponents/select/SelectComp";

const SettleBill = (props) => {
    return (
        <>
            <Row>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Table Number:</span>
                    <span className="p-1 pr-4 text-right small">{props.billingDetails.tableNumber || 0}</span>
                </Col>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Bill Number:</span>
                    <span className="p-1 pr-4 text-right small">{props.billingDetails.billNumber || ""}</span>
                </Col>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Bill Amount:</span>
                    <span className="p-1 pr-4 text-right small"><i className="fa fa-rupee-sign"></i> {props.billingDetails.netAmount || 0.00}</span>
                </Col>
            </Row>
            <Row>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Remaining:</span>
                    <span className="p-1 pr-4 text-right small"><i className="fa fa-rupee-sign"></i> {props.remainingAmount || 0.00}</span>
                </Col>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Tendered:</span>
                    <span className="p-1 pr-4 text-right small"><i className="fa fa-rupee-sign"></i> {props.tenderedAmount || 0.00}</span>
                </Col>
                <Col lg="4">
                    <span className="p-1 pl-4 font-weight-bold small">Return To Customer:</span>
                    <span className="p-1 pr-4 text-right small"><i className="fa fa-rupee-sign"></i> {props.returnToCustomer || 0.00}</span>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col lg="5">
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="vendorId"
                                >
                                    Vendor
                                </label>
                                {
                                    props.vendors && Array.isArray(props.vendors) &&
                                    <Select
                                        id="vendorId"
                                        className="form-control form-control-alternative"
                                        value={props.vendorId}
                                        onChange={props.onChange}
                                        error={props.errorMessages.vendorId}
                                        options={props.vendors.map((vendor) => ({
                                            text: vendor.name,
                                            value: vendor.id
                                        }))}
                                    >
                                    </Select>
                                }
                            </FormGroup>
                        </Col>
                        <Col lg="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="paymentModeId"
                                >
                                    Payment Mode
                                </label>
                                {
                                    props.paymentModes && Array.isArray(props.paymentModes) &&
                                    <Select
                                        id="paymentModeId"
                                        className="form-control form-control-alternative"
                                        value={props.paymentModeId}
                                        onChange={props.onChange}
                                        error={props.errorMessages.paymentModeId}
                                        options={props.paymentModes.map((mode) => ({
                                            text: mode.mode,
                                            value: mode.id
                                        }))}
                                    >
                                    </Select>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="transactionNumber"
                                >
                                    Transaction Number
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="transactionNumber"
                                    placeholder="Enter Transaction Number"
                                    type="text"
                                    value={props.transactionNumber}
                                    onChange={props.onChange}
                                    error={props.errorMessages.transactionNumber}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="amount"
                                >
                                    Amount
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="amount"
                                    placeholder="Enter Amount"
                                    type="text"
                                    value={props.amount}
                                    onChange={props.onChange}
                                    error={props.errorMessages.amount}
                                    disabled={props.vendor !== "Self" ? true : props.paymentMode === "Payment Due" ? true : false}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12" className="text-center">
                            <Button color="success" type="button" onClick={props.onPaymentAdd}>
                                Add Payment
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg="7">
                    <Table className="align-items-center table-flush table-bordered" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" className="Header">Sr. No. </th>
                                <th scope="col" className="Header">Vendor</th>
                                <th scope="col" className="Header">Payment Type</th>
                                <th scope="col" className="Header">Transaction Number</th>
                                <th scope="col" className="Header">Amount</th>
                                <th scope="col" className="Header"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.paymentDetails &&
                                props.paymentDetails.filter(x => x.isDeleted !== true)
                                .map((details, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {details.vendor}
                                            </td>
                                            <td>
                                                {details.paymentMode}
                                            </td>
                                            <td>
                                                {details.transactionNumber}
                                            </td>
                                            <td>
                                                {details.amount}
                                            </td>
                                            <td className="text-right">
                                                <span className="p-1 pr-4 text-right cursor-pointer" onClick={() => { props.onDeletePayment(index); }}><i className="fa fa-times cancel-icon-color"></i></span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col lg="12" className="text-right">
                    <Button color="success" type="button" onClick={props.onSettleBill}>
                        Settle Bill
                    </Button>
                    <Button color="info" type="button" onClick={props.onCancelSettlement}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default SettleBill;
