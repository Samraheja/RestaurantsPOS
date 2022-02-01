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
    const [selectedItemIndex, setSelectedItemIndex] = useState();
    const onAddClick = (e) => {
        e.preventDefault();
        props.onAddButtonClick();
    };
    const onItemSelect = ({item}) => {
        setSelectedItemIndex(undefined);
        props.onItemClick(item.id, item.name, item.tablePrice)
    };
    const onKeyDown = (e) => {
        if (e.code === "ArrowDown") {
            setSelectedItemIndex((selectedItemIndex === undefined) ? 0 : (selectedItemIndex < (props.filteredMenu.length - 1) ? (selectedItemIndex + 1) : selectedItemIndex))
        } else if (e.code === "ArrowUp") {
            setSelectedItemIndex(selectedItemIndex > 0 ? (selectedItemIndex - 1) : selectedItemIndex)
        }
        if (e.code === "Enter") {
            onItemSelect({item: props.filteredMenu[selectedItemIndex]})
        }
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
                        autoFocus={true}
                        autocomplete={'off'}
                        onKeyDown={onKeyDown}
                        // onKeyPress={onSearchKeyPress}
                        id="searchItem"
                        placeholder="Search Item..."
                        type="text"
                        className="form-control-alternative"
                        value={props.searchItem}
                        onChange={props.onChange}
                        error={props.errorMessages.searchItem}
                    />
                    <div className="autoComplete">
                        {props.filteredMenu.map((item, index) => {
                            return (
                                <div
                                    style={{backgroundColor: index === selectedItemIndex ? 'rgba(0,0,0,5%)' : 'transparent'}}
                                    className={props.suggestionBoxClass}
                                    onClick={() => onItemSelect({item})}
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
AutoComplete.defaultProps = {
    filteredMenu: []
}
export default AutoComplete;