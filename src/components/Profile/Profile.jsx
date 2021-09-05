import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "../Headers/UserHeader";
import Input from "../AppComponents/input/InputComp";

const Profile = (props) => {
  const RegistrationDate = props.getDate(props.createdDate.split('T')[0]);
  const StartDate = props.getDate(props.startDate.split('T')[0]);
  const EndDate = props.getDate(props.endDate.split('T')[0]);
  const DueDate = props.getDate(props.dueDate.split('T')[0]);

  return (
    <>
      <UserHeader restaurantName={props.restaurantName} />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="12">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      className="rounded-circle cursor-pointer"
                      src={props.profilePic ||
                        require("../../assets/img/theme/BlankPic.jpg")
                          .default
                      }
                      onClick={props.onEditProfilePic}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <input
                    type="file"
                    className="d-none"
                    ref={props.inputProfilePic}
                    onChange={props.onProfilePicSelect}
                  />
                  <h3>
                    {props.restaurantName || "Restaurant Name"}
                  </h3>
                  <div className="h5 font-weight-500">
                    <i className="ni location_pin mr-2" />
                    {props.address || "Address"},
                    {props.city || "City"}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Registration Date: {RegistrationDate}
                  </div>
                  <div>
                    <h5 className="m-0 p-0">Subscription Status: {props.subscriptionStatus}</h5>
                  </div>
                  <hr className="my-4" />
                  <div className="h4 mt-1">
                    Subscription Details
                  </div>
                  <div className="h5 font-weight-600">
                    <i className="ni business_briefcase-24 mr-2" />
                    <span className="font-weight-400">Start Date:</span> {StartDate}
                  </div>
                  <div className="h5 font-weight-600">
                    <i className="ni business_briefcase-24 mr-2" />
                    <span className="font-weight-400">End Date:</span> {EndDate}
                  </div>
                  <div className="h5 font-weight-600">
                    <i className="ni business_briefcase-24 mr-2" />
                    <span className="font-weight-400">Payment Due Date:</span> {props.paymentStatus === false ? DueDate : "NA"}
                  </div>
                  {
                    false &&
                    <div className="text-center">
                      <Button className="my-4" color="warning" type="button">
                        {
                          props.paymentStatus === false && props.subscriptionStatus === "Trial Period"
                            ? "Subscribe"
                            : "Renew"
                        }
                      </Button>
                    </div>
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Restaurant information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="restaurantName"
                          >
                            Restaurant Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="restaurantName"
                            placeholder="Restaurant Name"
                            type="text"
                            value={props.restaurantName}
                            onChange={props.onChange}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="noOfTables"
                          >
                            Number of Tables
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="noOfTables"
                            placeholder="Number of Tables"
                            type="number"
                            value={props.noOfTables}
                            onChange={props.onChange}
                            error={props.errorMessages.noOfTables}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            placeholder="mail@example.com"
                            type="email"
                            value={props.email}
                            onChange={props.onChange}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="mobileNumber"
                          >
                            Mobile Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="mobileNumber"
                            placeholder="Mobile Number"
                            type="number"
                            value={props.mobileNumber}
                            onChange={props.onChange}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="phoneNumber"
                          >
                            Alternate Mobile Number
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
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="website"
                          >
                            Website
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="website"
                            placeholder="www.example.com"
                            type="text"
                            value={props.website}
                            onChange={props.onChange}
                            error={props.errorMessages.website}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="GSTIN"
                          >
                            GST Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="GSTIN"
                            placeholder="GST Number"
                            type="text"
                            value={props.GSTIN}
                            onChange={props.onChange}
                            error={props.errorMessages.GSTIN}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="address"
                          >
                            Address
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
                            City
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
                            State
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
                            Zip Code
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
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12" className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={props.onSubmitClick}>
                          Update
                      </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
