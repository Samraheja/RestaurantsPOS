import React from "react";
import {
    Button,
    Row,
    Col,
    Input
} from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    discountAmountLabel, netAmountLabel,discountPercentLabel, totalAmtLabel, totalLabel, taxLabel
} = localizedStrings;

const BillSummary = (props) => {
    return (
        <>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    {totalLabel}
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"/> {props.billingDetails.amount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    {taxLabel}
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"/> {props.billingDetails.tax || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    {totalAmtLabel}
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"/> {props.billingDetails.totalAmount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="8" className="p-1 pl-4 font-weight-bold small">
                    {discountPercentLabel}
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
                        disabled={props.billingDetails.isKOTDone === false}
                        onChange={props.onChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="8" className="p-1 pl-4 font-weight-bold small">
                    {discountAmountLabel}
                </Col>
                <Col lg="4" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"/> {props.discountAmount || 0.00}
                </Col>
            </Row>
            <Row>
                <Col lg="6" className="p-1 pl-4 font-weight-bold small">
                    {netAmountLabel}
                </Col>
                <Col lg="6" className="p-1 pr-4 text-right small">
                    <i className="fa fa-rupee-sign"/> {props.netAmount === 0 ? props.billingDetails.totalAmount : props.netAmount}
                </Col>
            </Row>
            <hr className="m-2"/>
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