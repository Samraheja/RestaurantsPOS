import React from "react";
import {
    Button,
    Row,
    Col,
} from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    okButtonLabel, cancelButtonLabel
} = localizedStrings;

const DailyOpeningClosing = (props) => {
    return (
        <>
            <Row>
                <Col lg="12">
                    {props.message}
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col className="text-right">
                    <Button color="primary" type="button" onClick={props.onDayOpenClose}>
                        {okButtonLabel}
                    </Button>
                    <Button color="danger" type="button" onClick={props.onCancel}>
                        {cancelButtonLabel}
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default DailyOpeningClosing;