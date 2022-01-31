import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import localizedStrings from '../../constants/localizations'

const { categoryLabel } = localizedStrings;

const AddCategory = (props) => {
    return (
        <>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="category"
                        >
                            {categoryLabel}
                        </label>
                        <Input
                            className="form-control-alternative"
                            id="category"
                            placeholder="Enter Category"
                            type="text"
                            value={props.category}
                            onChange={props.onChange}
                            error={props.errorMessages.category}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button color="primary" type="button" onClick={props.onCategorySave}>
                        {props.buttonText}
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AddCategory;