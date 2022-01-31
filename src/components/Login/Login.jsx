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
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Loader from "../AppComponents/Loader/Loader";
import localizedStrings from '../../constants/localizations'

const {
    signInTitle, rememberMeLabel, createNewAccountLabel, signInLabel, forgotPasswordLabel
} = localizedStrings;

const Login = (props) => {

    return (
        <>
            {
                props.isLoading && <Loader/>
            }
            <Col lg="5" md="7">
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
                    <CardBody className="px-lg-5 py-lg-2">
                        <div className="text-center text-muted mb-4">
                            <small>{signInTitle}</small>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="email"
                                        id="email"
                                        autoComplete="new-email"
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
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        value={props.password}
                                        onChange={props.handleChange}
                                        error={props.errorMessages.password}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <Input
                                    className="custom-control-input"
                                    id=" rememberMe"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" rememberMe"
                                >
                                    <span className="text-muted">{rememberMeLabel}</span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button"
                                        onClick={props.handleSubmitClick}>
                                    {signInLabel}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                props.redirectToForgotPassword();
                            }}
                        >
                            <small>{forgotPasswordLabel}</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                props.redirectToRegister();
                            }}
                        >
                            <small>{createNewAccountLabel}</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default Login;