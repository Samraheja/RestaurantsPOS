import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Loader from "../AppComponents/Loader/Loader";
import PasswordPolicy from "../AppComponents/PasswordPolicy/PasswordPolicy";

const ResetPassword = (props) => {

    return (
        <>
            {
                props.isLoading && <Loader />
            }
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-3">
                        <div className="btn-wrapper text-center">
                            <img
                                alt="..."
                                src={
                                    require("../../assets/img/brand/Logo.png").default
                                }
                                className="LogoImg"
                            />
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-2 mb-5">
                        <div className="text-center text-muted mb-4">
                            <small>Reset your password</small>
                        </div>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={props.email}
                                        onChange={props.handleChange}
                                        error={props.errorMessages.email}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={props.password}
                                        onChange={props.handleChange}
                                        error={props.errorMessages.password}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={props.confirmPassword}
                                        onChange={props.handleChange}
                                        error={props.errorMessages.confirmPassword}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <PasswordPolicy />
                            <div className="text-center">
                                <Button className="mt-4" color="primary" type="button" onClick={props.handleSubmitClick}>
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default ResetPassword;
