import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";

const AddCover = (props) => {
    return (
        <>
            <Row>
                <Col lg="12" className="token bold">
                    Table Number: {props.tableNumber}
                </Col>
            </Row>
            <br />
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="cover"
                        >
                            Cover
                        </label>
                        <Input
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
                    <Button color="primary" type="button" onClick={props.onAddCover}>
                        Add
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AddCover;