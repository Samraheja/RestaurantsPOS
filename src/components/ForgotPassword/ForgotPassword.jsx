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

const ForgotPassword = (props) => {

  return (
    <>
      {
        props.isLoading && <Loader />
      }
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
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
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Forgot Password</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
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
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={props.handleSubmitClick}>
                  Forgot Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a
              className="text-light"
              href="/#"
              onClick={(e) => { e.preventDefault(); props.redirectToLogin(); }}
            >
              <small>Back to Login</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ForgotPassword;