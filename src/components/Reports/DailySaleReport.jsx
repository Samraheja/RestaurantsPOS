import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Input,
    Col
} from "reactstrap";
import Pagination from "../AppComponents/Pagination/Pagination";
import Select from "../AppComponents/select/SelectComp";
import { Months, Years } from "../../constants/apiConstants";

const yearsList = Years();

const DailySaleReport = (props) => {
    debugger
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col lg="6">
                                        <span className="font-weight-bold">Daily Sale Report By Payment Modes</span>
                                    </Col>
                                    <Col lg="3">
                                        <Select
                                            id="month"
                                            className="form-control form-control-alternative"
                                            value={props.month}
                                            onChange={props.onChange}
                                            options={Months.map((month) => ({
                                                text: month.name,
                                                value: month.value
                                            }))}
                                        >
                                        </Select>
                                    </Col>
                                    <Col lg="3">
                                        <Select
                                            id="year"
                                            className="form-control form-control-alternative"
                                            value={props.year}
                                            onChange={props.onChange}
                                            showDefault={false}
                                            options={yearsList}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush tblSettle" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="Header">Sr. No. </th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("BillDate")}>Bill Date</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("BillAmount")}>Bill Amount</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("Cash")}>Cash</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("Paytm")}>Paytm</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("PhonePe")}>PhonePe</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("GooglePay")}>Google Pay</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("COD")}>COD</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("OnlinePayment")}>Online Payment</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("PaymentDue")}>Payment Due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.dailySales &&
                                        props.dailySales.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.billDate}
                                                    </td>
                                                    <td>
                                                        {item.billAmount}
                                                    </td>
                                                    <td>
                                                        {item.cash}
                                                    </td>
                                                    <td>
                                                        {item.paytm}
                                                    </td>
                                                    <td>
                                                        {item.phonePe}
                                                    </td>
                                                    <td>
                                                        {item.googlePay}
                                                    </td>
                                                    <td>
                                                        {item.cod}
                                                    </td>
                                                    <td>
                                                        {item.onlinePayment}
                                                    </td>
                                                    <td>
                                                        {item.paymentDue}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <Pagination
                                    totalPages={props.totalPages}
                                    pageNo={props.pageNo}
                                    onPageChange={props.onPageChange}
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
};

export default DailySaleReport;