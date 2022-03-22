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
import { Months, Years } from "../../constants/constants";
import localizedStrings from '../../constants/localizations'

const {
    dailySalesReportTitle, serialNoTitle, PaytmTitle, cashTitle, billAmountTitle, billDateTitle,
    phonePayTitle, googlePayTitle, codTitle, onlinePaymentTitle, paymentDueTitle, discountAmountTitle
} = localizedStrings;

const yearsList = Years();

const DailySaleReport = (props) => {
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
                                        <span className="font-weight-bold">{dailySalesReportTitle}</span>
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
                                    <th scope="col" className="Header">{serialNoTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("BillDate")}>{billDateTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("BillAmount")}>{billAmountTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("Cash")}>{cashTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("Paytm")}>{PaytmTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("PhonePe")}>{phonePayTitle}
                                    </th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("GooglePay")}>{googlePayTitle}
                                    </th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("COD")}>{codTitle}</th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("OnlinePayment")}>{onlinePaymentTitle}
                                    </th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("PaymentDue")}>{paymentDueTitle}
                                    </th>
                                    <th scope="col" className="Header"
                                        onClick={() => props.SortRecords("DiscountAmount")}>{discountAmountTitle}
                                    </th>
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
                                                    <td className="cursor-pointer text-primary" onClick={() => props.onDateClick(item.date)}>
                                                        {item.date}
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
                                                    <td>
                                                        {item.discountAmount}
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