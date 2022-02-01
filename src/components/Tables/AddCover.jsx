import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import localizedStrings from '../../constants/localizations'

const {
    tableNumberLabel, coverLabel, addButtonLabel
} = localizedStrings;

const AddCover = (props) => {
    const onAddCoverPress = (e) => {
        props.onAddCover(e)
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onAddCoverPress(e)
        }
    };
    return (
        <>
            <Row>
                <Col lg="12" className="token bold">
                    {tableNumberLabel}{props.tableNumber}
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="cover"
                        >
                            {coverLabel}
                        </label>
                        <Input
                            onKeyPress={onKeyPress}
                            autoFocus={true}
                            className="form-control-alternative"
                            id="cover"
                            placeholder="Enter Cover"
                            type="number"
                            min="1"
                            value={props.cover}
                            onChange={props.onChange}
                            error={props.errorMessages.cover}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button color="primary" type="button" onClick={onAddCoverPress}>
                        {addButtonLabel}
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AddCover;