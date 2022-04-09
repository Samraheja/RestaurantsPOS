import React from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Input,
    Col,
    CardBody,
    Table
} from "reactstrap";
import localizations from "../../constants/localizations";

const { dayBookLabel, openingBalanceLabel, dayCreditLabel, dayDebitLabel, balanceLabel, closingBalanceLabel } = localizations;

const DayBook = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-5">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col lg="6">
                                        <span className="font-weight-bold">{dayBookLabel}</span>
                                    </Col>
                                    <Col lg="2" className="text-right pt-2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="date"
                                        >
                                            Date:
                                        </label>
                                    </Col>
                                    <Col lg="4">
                                        <Input
                                            className="form-control-alternative"
                                            id="date"
                                            type="date"
                                            value={props.date}
                                            onChange={props.onChange}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pb-0 pl-3 pr-3">
                                <Row>
                                    <Col lg="3" className="border-right border-top p-0 bg-secondary">
                                        <div className="h4 font-weight-600 p-2">
                                            <span className="font-weight-400">{openingBalanceLabel}</span> -
                                            <i className="fa fa-rupee-sign ml-2 mr-1" />
                                            {props.dayBook && props.dayBook.openingBalance}
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                        <div className="h4 font-weight-600 p-2">
                                            <span className="font-weight-400">{dayCreditLabel}</span> -
                                            <i className="fa fa-rupee-sign ml-2 mr-1" />
                                            {props.dayBook && props.dayBook.credits}
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                        <div className="h4 font-weight-600 p-2">
                                            <span className="font-weight-400">{dayDebitLabel}</span> -
                                            <i className="fa fa-rupee-sign ml-2 mr-1" />
                                            {props.dayBook && props.dayBook.debits}
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                        <div className="h4 font-weight-600 p-2">
                                            <span className="font-weight-400">{balanceLabel}</span> -
                                            <i className="fa fa-rupee-sign ml-2 mr-1" />
                                            {props.dayBook && props.dayBook.balance}
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                        <div className="h4 font-weight-600 p-2">
                                            <span className="font-weight-400">{closingBalanceLabel}</span> -
                                            <i className="fa fa-rupee-sign ml-2 mr-1" />
                                            {props.dayBook && props.dayBook.closingBalance}
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                    </Col>
                                    <Col lg="9" className="transactions p-0">
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col" className="Header w-15">Time</th>
                                                    <th scope="col" className="Header w-45">Particular</th>
                                                    <th scope="col" className="Header w-20">Credit</th>
                                                    <th scope="col" className="Header w-20">Debit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.dayBook &&
                                                    props.dayBook.ledger &&
                                                    props.dayBook.ledger.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="w-15">
                                                                    {item.time}
                                                                </td>
                                                                <td className="w-45">
                                                                    {item.particulars}
                                                                </td>
                                                                <td className="w-19">
                                                                    {item.transactionType == "Cr" ? item.amount : ""}
                                                                </td>
                                                                <td className="w-19">
                                                                    {item.transactionType == "Dr" ? item.amount : ""}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <div ref={props.messagesEndRef}></div>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    )
};

export default DayBook;