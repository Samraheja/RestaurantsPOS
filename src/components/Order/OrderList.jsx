import React from "react";
import {
    Row,
    Col,
    Table
} from "reactstrap";

const OrderList = (props) => {

    return (
        <>
            <Row>
                <Col lg="12" className="p-0 tblOrder">
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" className="Header">#</th>
                                <th scope="col" className="Header">Name</th>
                                <th scope="col" className="Header">Quantity</th>
                                <th scope="col" className="Header">Rate</th>
                                <th scope="col" className="Header pl-0">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.orderedItems &&
                                props.orderedItems.map((item, index) => {
                                    console.log(item);
                                    return (
                                        <tr key={index}  className={item.isKOTPrinted === false ? "text-danger": ""}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {item.menu.name}
                                            </td>
                                            <td className="text-center">
                                                <span
                                                    onClick={() => { props.onQuantityUpdate(item.id, item.quantity, "Add") }}
                                                >
                                                    <i
                                                        className="fas fa-plus-square text-danger quanity-icon"
                                                    ></i>
                                                </span>
                                                {item.quantity}
                                                <span
                                                    onClick={() => { props.onQuantityUpdate(item.id, item.quantity, "Subtract") }}
                                                >
                                                    <i
                                                        className="fas fa-minus-square text-danger quanity-icon"
                                                    ></i>
                                                </span>
                                            </td>
                                            <td>
                                                {item.price}
                                            </td>
                                            <td>
                                                {item.amount}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
};

export default OrderList;