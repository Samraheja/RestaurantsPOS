import React from "react";
import {
    Button,
    Row,
    Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";

const AutoComplete = (props) => {
    return (
        <>
            <Row>
                <Col lg="7" className="p-1 position-relative">
                    <Input
                        id="searchItem"
                        placeholder="Search Item..."
                        type="text"
                        className="form-control-alternative"
                        value={props.searchItem}
                        onChange={props.onChange}
                        error={props.errorMessages.searchItem}
                    />
                    <div className="autoComplete">
                        {
                            props.filteredMenu &&
                            props.filteredMenu.map((item, index) => {
                                return (
                                    <div
                                        className={props.suggestionBoxClass}
                                        onClick={() => { props.onItemClick(item.id, item.name, item.tablePrice) }}
                                    >
                                        <span key={index}>{item.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col lg="2" className="p-1">
                    <Input
                        id="quantity"
                        placeholder="Qty"
                        type="number"
                        className="form-control-alternative"
                        min="1"
                        value={props.quantity}
                        onChange={props.onChange}
                        error={props.errorMessages.quantity}
                    />
                </Col>
                <Col lg="3" className="p-1">
                    <Button
                        color="danger"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onAddButtonClick();
                        }}
                    >
                        Add
                        <i className="fa fa-plus-circle pl-2"></i>
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AutoComplete;