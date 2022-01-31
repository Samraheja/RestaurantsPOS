import React from "react";
import { Container, Row, Col } from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    restaurantUpdatePolicy
} = localizedStrings;

const UserHeader = (props) => {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundImage:
                        "url(" +
                        require("../../assets/img/theme/CoverPic.jpg").default +
                        ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                <span className="mask bg-gradient-default opacity-8"/>
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">{props.restaurantName}</h1>
                            <p className="text-white mt-0 mb-5">
                                {restaurantUpdatePolicy}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserHeader;
