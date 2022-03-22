import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Input,
    Col,
    CardBody,
    FormGroup,
    Button
} from "reactstrap";
import Pagination from "../AppComponents/Pagination/Pagination";
import Select from "../AppComponents/select/SelectComp";
import localizedStrings from "../../constants/localizations";

const {
    addressLabel, emailLabel, nameLabel, mobileNoLabel, altMobileNoLabel, dueAmountLabel, settleAmountLabel,
    paymentModeLabel, settlementAmountLabel, settleBtnLabel, backBtnLabel
} = localizedStrings;

const SettleDues = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <Col lg="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{settleAmountLabel}</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="name"
                                            >
                                                {nameLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="name"
                                                type="text"
                                                value={props.customer.name}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="email"
                                            >
                                                {emailLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="email"
                                                type="text"
                                                value={props.customer.emailID}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="mobileNumber"
                                            >
                                                {mobileNoLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="mobileNumber"
                                                type="text"
                                                value={props.customer.mobileNumber}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="phoneNumber"
                                            >
                                                {altMobileNoLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="phoneNumber"
                                                type="text"
                                                value={props.customer.phoneNumber}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="8">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="address"
                                            >
                                                {addressLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="address"
                                                type="text"
                                                value={
                                                    props.customer.address + ", " +
                                                    props.customer.city + ", " +
                                                    props.customer.state + " - " +
                                                    props.customer.zipCode
                                                }
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="dueAmount"
                                            >
                                                {dueAmountLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="dueAmount"
                                                type="text"
                                                value={props.customer.dueAmount}
                                                disabled={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="paymentModeId"
                                            >
                                                {paymentModeLabel}
                                            </label>
                                            {
                                                props.paymentModes && Array.isArray(props.paymentModes) &&
                                                <Select
                                                    id="paymentModeId"
                                                    className="form-control form-control-alternative"
                                                    value={props.paymentModeId}
                                                    onChange={props.onChange}
                                                    options={props.paymentModes.map((mode) => ({
                                                        text: mode.mode,
                                                        value: mode.id
                                                    }))}
                                                >
                                                </Select>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="settlementAmount"
                                            >
                                                {settlementAmountLabel}
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="settlementAmount"
                                                placeholder="Enter Amount"
                                                type="text"
                                                maxLength={7}
                                                value={props.settlementAmount}
                                                onChange={props.onChange}
                                                error={props.errorMessages.settlementAmount}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr className="my-4" />
                                <Row>
                                    <Col className="text-center">
                                        <Button color="primary" type="button" onClick={props.onSettleAmount}>
                                            {settleBtnLabel}
                                        </Button>
                                        <Button color="warning" type="button" onClick={props.onBack}>
                                            {backBtnLabel}
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>
                                        <Table className="align-items-center border table-flush tblSettle" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col" className="Header bg-primary text-white">Sr. No.</th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("BillDate")}>Bill Date
                                                    </th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("BillNumber")}>Bill Number
                                                    </th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("Name")}>Customer Name
                                                    </th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("PaymentMode")}>Payment Mode
                                                    </th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("Amount")}>Net Amount
                                                    </th>
                                                    <th scope="col" className="Header bg-primary text-white"
                                                        onClick={() => props.SortRecords("SettledAmount")}>Settled Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.settledBills &&
                                                    props.settledBills.map((item, index) => {
                                                        return (
                                                            <tr key={index} className="bg-white">
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {item.billDate}
                                                                </td>
                                                                <td>
                                                                    {item.billNumber}
                                                                </td>
                                                                <td>
                                                                    {item.name}
                                                                </td>
                                                                <td>
                                                                    {item.paymentModes}
                                                                </td>
                                                                <td>
                                                                    {item.amount}
                                                                </td>
                                                                <td>
                                                                    {item.settledAmount}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <Row className="m-0 border">
                                            <Col className="p-3 bg-white">
                                                <Pagination
                                                    totalPages={props.totalPages}
                                                    pageNo={props.pageNo}
                                                    onPageChange={props.onPageChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SettleDues;