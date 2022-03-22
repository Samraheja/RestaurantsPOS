import React from "react";
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Row
} from "reactstrap";
import Pagination from "../AppComponents/Pagination/Pagination";
import localizedStrings from "../../constants/localizations";

const {
    nameLabel, emailLabel, mobileNoLabel, altMobileNoLabel, dueAmountLabel, settleAmountLabel
} = localizedStrings;

const Customers = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <span className="font-weight-bold">Customers</span>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="Header">Sr. No.</th>
                                        <th scope="col" className="Header"
                                            onClick={() => props.SortRecords("Name")}>{nameLabel}</th>
                                        <th scope="col" className="Header"
                                            onClick={() => props.SortRecords("EmailID")}>{emailLabel}</th>
                                        <th scope="col" className="Header"
                                            onClick={() => props.SortRecords("MobileNumber")}>{mobileNoLabel}</th>
                                        <th scope="col" className="Header"
                                            onClick={() => props.SortRecords("PhoneNumber")}>{altMobileNoLabel}</th>
                                        <th scope="col" className="Header"
                                            onClick={() => props.SortRecords("DueAmount")}>{dueAmountLabel}</th>
                                        <th scope="col" className="Header">{settleAmountLabel}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.customers &&
                                        props.customers.map((customer, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {customer.name}
                                                    </td>
                                                    <td>
                                                        {customer.emailID}
                                                    </td>
                                                    <td>
                                                        {customer.mobileNumber}
                                                    </td>
                                                    <td>
                                                        {customer.phoneNumber}
                                                    </td>
                                                    <td>
                                                        {customer.dueAmount}
                                                    </td>
                                                    <td>
                                                        {
                                                            customer.dueAmount > 0 && <a href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    props.onSettleDuesClick(customer.id);
                                                                }}>
                                                                {settleAmountLabel}
                                                            </a>
                                                        }
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
}

export default Customers;