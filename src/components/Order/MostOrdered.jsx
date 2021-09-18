import React from "react";
import {
    Row,
    Col
} from "reactstrap";

const MostOrdered = (props) => {
    return (
        <>
            <Row>
                <Col lg="12" className="token bold">
                    Table Number: {props.tableNumber}
                    <hr className="m-0" />
                </Col>
            </Row>
            <Row>
                {
                    props.mostOrdered &&
                    props.mostOrdered.map((item, index) => {
                        return (
                            <Col lg="4" key={index} className="cursor-pointer p-1">
                                <div
                                    className="MostOrdered"
                                    onClick={() => { props.onMenuItemAdd(item.id, item.tablePrice, 1); }}
                                >
                                    {item.name}
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <div className="pt-5"></div>
            <Row>
                <Col lg="12" className="token bold">
                    Sub Categories
                    <hr className="m-0" />
                </Col>
            </Row>
            <Row>
                {
                    props.subCategories &&
                    props.subCategories.map((item, index) => {
                        return (
                            <Col lg="3" key={index} className="cursor-pointer p-1">
                                <div
                                    className="MostOrdered"
                                    onClick={() => { props.getMostOrderedItems(item.id); }}
                                >
                                    {item.subCategoryName}
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
};

export default MostOrdered;