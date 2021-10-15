import React from "react";
import {
    Button,
    Row,
    Col,
    Input
} from "reactstrap";

const BillSummary = (props) => {
    return (
        <>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    Total:
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"></i> {props.billingDetails.amount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    Tax:
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"></i> {props.billingDetails.tax || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    Total Amount:
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"></i> {props.billingDetails.totalAmount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="8" className="p-1 pl-4 font-weight-bold small">
                    Discount (%):
                </Col>
                <Col lg="4" className="p-1 pr-4 text-right small p-0">
                    <Input
                        id="discount"
                        placeholder="%"
                        type="number"
                        className="form-control-alternative discountInput"
                        min="0"
                        max="99"
                        maxLength="2"
                        value={props.discount}
                        disabled={props.billingDetails.isKOTDone === false ? true : false}
                        onChange={props.onChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="8" className="p-1 pl-4 font-weight-bold small">
                    Discount Amount:
                </Col>
                <Col lg="4" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"></i> {props.discountAmount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    Net Amount:
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"></i> {props.netAmount === 0 ? props.billingDetails.totalAmount : props.netAmount}
                </Col>
            </Row>
            <hr className="m-2" />
            <Row>
                <Col lg="12" className="pl-4 pr-4">
                    <Button
                        color="danger"
                        type="button"
                        className="btn-block"
                        onClick={() => props.onCompleteOrder()}
                    >
                        {props.buttonText}
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default BillSummary;