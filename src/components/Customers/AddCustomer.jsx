import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import localizedStrings from '../../constants/localizations'

const {
    customerInfoLabel, contactInfoLabel, saveButtonLabel, cityLabel, stateLabel, zipCodeLabel,
    addressLabel, emailLabel, nameLabel, mobileNoLabel, altMobileNoLabel
} = localizedStrings;

const AddCustomer = (props) => {

    return (
        <>
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">{customerInfoLabel}</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Form>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="name"
                                        >
                                            {nameLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="name"
                                            placeholder="Name"
                                            type="text"
                                            value={props.name}
                                            onChange={props.onChange}
                                            error={props.errorMessages.name}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="email"
                                        >
                                            {emailLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="email"
                                            placeholder="mail@example.com"
                                            type="email"
                                            value={props.email}
                                            onChange={props.onChange}
                                            error={props.errorMessages.email}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="mobileNumber"
                                        >
                                            {mobileNoLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="mobileNumber"
                                            placeholder="Mobile Number"
                                            type="number"
                                            value={props.mobileNumber}
                                            onChange={props.onChange}
                                            error={props.errorMessages.mobileNumber}
                                            disabled={true}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="phoneNumber"
                                        >
                                            {altMobileNoLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="phoneNumber"
                                            placeholder="Alternate Mobile No."
                                            type="text"
                                            value={props.phoneNumber}
                                            onChange={props.onChange}
                                            error={props.errorMessages.phoneNumber}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4"/>
                        <h6 className="heading-small text-muted mb-4">
                            {contactInfoLabel}
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="address"
                                        >
                                            {addressLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="address"
                                            placeholder="Address"
                                            type="text"
                                            value={props.address}
                                            onChange={props.onChange}
                                            error={props.errorMessages.address}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="city"
                                        >
                                            {cityLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="city"
                                            placeholder="City"
                                            type="text"
                                            value={props.city}
                                            onChange={props.onChange}
                                            error={props.errorMessages.city}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="states"
                                        >
                                            {stateLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="states"
                                            placeholder="State"
                                            type="text"
                                            value={props.states}
                                            onChange={props.onChange}
                                            error={props.errorMessages.states}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="zipCode"
                                        >
                                            {zipCodeLabel}
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="zipCode"
                                            placeholder="Zip code"
                                            type="text"
                                            value={props.zipCode}
                                            onChange={props.onChange}
                                            error={props.errorMessages.zipCode}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4"/>
                        <div className="pl-lg-4">
                            <Row>
                                <Col md="12" className="text-center">
                                    <Button className="my-4" color="danger" type="button" onClick={props.onSubmitClick}>
                                        {saveButtonLabel}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
};

export default AddCustomer;