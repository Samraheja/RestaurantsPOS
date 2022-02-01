import React, {useState} from "react";
import {
    Button,
    Row,
    Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import localizedStrings from '../../constants/localizations'

const {
    addButtonLabel
} = localizedStrings;

const AutoComplete = (props) => {
    const [activeItemIndex, updateActiveItemIndex] = useState(0)
    const onAddClick = (e) => {
        e.preventDefault();
        props.onAddButtonClick();
    };
    const onSearchKeyPress = (e) => {
        updateActiveItemIndex(1)
    };
    const onQuantityKeyPress = (e) => {
        if (e.key === 'Enter') {
            onAddClick(e)
        }
    };
    return (
        <>
            <Row>
                <Col lg="7" className="p-1 position-relative">
                    <Input
                        autoFocus={activeItemIndex === 0}
                        autocomplete={'off'}
                        onKeyPress={onSearchKeyPress}
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
                                        onClick={() => {
                                            props.onItemClick(item.id, item.name, item.tablePrice)
                                        }}
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
                        autoFocus={activeItemIndex === 1}
                        onKeyPress={onQuantityKeyPress}
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
                        onClick={onAddClick}
                    >
                        {addButtonLabel}
                        <i className="fa fa-plus-circle pl-2"/>
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AutoComplete;