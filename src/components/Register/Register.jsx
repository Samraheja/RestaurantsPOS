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
  Col
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Loader from "../AppComponents/Loader/Loader";
import PasswordPolicy from "../AppComponents/PasswordPolicy/PasswordPolicy";

const Register = (props) => {

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
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={props.name}
                    onChange={props.handleChange}
                    error={props.errorMessages.name}
                  />
                </InputGroup>
              </FormGroup>
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
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    value={props.mobileNumber}
                    onChange={props.handleChange}
                    error={props.errorMessages.mobileNumber}
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
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <Input
                      className="custom-control-input"
                      id="acceptTerms"
                      type="checkbox"
                      checked={props.acceptTerms}
                      onChange={props.handleChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="acceptTerms"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a
                          href="#sahil"
                          onClick={(e) => e.preventDefault()}>
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button color="primary" type="button" onClick={props.handleSubmitClick}>
                  Register
                </Button>
              </div>
            </Form>
            <hr className="my-3" />
            <Row className="mt-3">
              <Col className="text-center" xs="12">
                <span className="text-red mr-1"> Already have an account? </span>
                <a
                  href="#sahil"
                  onClick={(e) => { e.preventDefault(); props.redirectToLogin(); }}
                >
                  Login
            </a>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
