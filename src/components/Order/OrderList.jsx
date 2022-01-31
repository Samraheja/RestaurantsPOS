import React from "react";
import {
    Row,
    Col,
    Table
} from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    nameLabel, rateLabel, quantityLabel, amountLabel
} = localizedStrings;

const OrderList = (props) => {

    return (
        <>
            <Row>
                <Col lg="12" className="p-0 tblOrder">
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col" className="Header">#</th>
                            <th scope="col" className="Header">{nameLabel}</th>
                            <th scope="col" className="Header">{quantityLabel}</th>
                            <th scope="col" className="Header">{rateLabel}</th>
                            <th scope="col" className="Header pl-0">{amountLabel}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.orderedItems &&
                            props.orderedItems.map((item, index) => {
                                return (
                                    <tr key={index} className={item.isKOTPrinted === false ? "text-danger" : ""}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {item.menu.name}
                                        </td>
                                        <td className="text-center">
                                                <span
                                                    onClick={() => {
                                                        props.onQuantityUpdate(item.id, item.quantity, "Add")
                                                    }}
                                                >
                                                    <i
                                                        className="fas fa-plus-square text-danger quanity-icon"
                                                    />
                                                </span>
                                            {item.quantity}
                                            <span
                                                onClick={() => {
                                                    props.onQuantityUpdate(item.id, item.quantity, "Subtract")
                                                }}
                                            >
                                                    <i
                                                        className="fas fa-minus-square text-danger quanity-icon"
                                                    />
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