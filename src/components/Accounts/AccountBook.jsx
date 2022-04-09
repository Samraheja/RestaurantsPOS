import React from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    CardBody,
    Table
} from "reactstrap";
import localizations from "../../constants/localizations";
import Select from "../AppComponents/select/SelectComp";

const { accountBookLabel } = localizations;

const AccountBook = (props) => {
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
                                        <span className="font-weight-bold">{accountBookLabel}</span>
                                    </Col>
                                    <Col lg="2" className="text-right pt-2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="accountId"
                                        >
                                            Account:
                                        </label>
                                    </Col>
                                    <Col lg="4">
                                        {
                                            props.accountBook && Array.isArray(props.accountBook) &&
                                            <Select
                                                id="accountId"
                                                className="form-control form-control-alternative"
                                                value={props.accountId}
                                                onChange={props.onChange}
                                                showDefault={true}
                                                options={props.accountBook.map((account) => ({
                                                    text: account.name,
                                                    value: account.id.toString()
                                                }))}
                                            >
                                            </Select>
                                        }
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pb-0 pl-3 pr-3">
                                <Row>
                                    <Col className="transactions p-0">
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col" className="Header w-15">Date</th>
                                                    <th scope="col" className="Header w-45">Particular</th>
                                                    <th scope="col" className="Header w-20">Credit</th>
                                                    <th scope="col" className="Header w-20">Debit</th>
                                                    <th scope="col" className="Header w-20">Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.ledger &&
                                                    props.ledger.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="w-15">
                                                                    {item.date}
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
                                                                <td className="w-19">
                                                                    {item.balance}
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

export default AccountBook;