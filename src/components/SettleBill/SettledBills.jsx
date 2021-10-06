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

const SettledBills = (props) => {
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
                                        <span className="font-weight-bold">Settled Bills</span>
                                    </Col>
                                    <Col lg="2" className="text-right pt-2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="billDate"
                                        >
                                            Bill Date: 
                                        </label>
                                    </Col>
                                    <Col lg="4">
                                        <Input
                                            className="form-control-alternative"
                                            id="billDate"
                                            type="date"
                                            value={props.billDate}
                                            onChange={props.onChange}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="Header">Sr. No. </th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("BillDate")}>Bill Date</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("BillNumber")}>Bill Number</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("Name")}>Customer Name</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("PaymentMode")}>Payment Mode</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("Amount")}>Amount</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("SettledAmount")}>Settled Amount</th>
                                        <th scope="col" className="Header" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.settledBills &&
                                        props.settledBills.map((item, index) => {
                                            return (
                                                <tr key={index}>
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

export default SettledBills;