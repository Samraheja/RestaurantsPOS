import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
} from "reactstrap";

const DailyOpeningClosing = (props) => {
    return (
        <>
            <Row>
                <Col lg="12">
                    {props.message}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="text-right">
                    <Button color="primary" type="button" onClick={props.onDayOpenClose}>
                        Ok
                    </Button>
                    <Button color="danger" type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default DailyOpeningClosing;