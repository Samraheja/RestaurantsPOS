import React from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
} from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    myProfileLabel, welcomeTitle, daySaleTitle, unsettledTitle,
    openDayLabel, closeDayLabel, logoutLabel, settingsLabel
} = localizedStrings;


const AdminNavbar = (props) => {
    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                    >
                        {props.brandText}
                    </Link>
                    <Form
                        className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto small white">
                        <div className="pr-2">{daySaleTitle}<i className="fa fa-rupee-sign"/> {props.daySale || 0.00}
                        </div>
                        |
                        <div className="pl-2">{unsettledTitle}<i
                            className="fa fa-rupee-sign"/> {props.unsettled || 0.00}
                        </div>
                    </Form>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-search"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text"/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                        alt="..."
                        src={props.profilePic ||
                        require("../../assets/img/theme/BlankPic.jpg")
                            .default
                        }
                    />
                  </span>
                                    <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {props.name}
                    </span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">{welcomeTitle}</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-single-02"/>
                                    <span>{myProfileLabel}</span>
                                </DropdownItem>
                                <DropdownItem to="#" tag={Link} onClick={() => props.openOrCloseDay("Open")}>
                                    <i className="fas fa-lock-open"/>
                                    <span>{openDayLabel}</span>
                                </DropdownItem>
                                <DropdownItem to="#" tag={Link} onClick={() => props.openOrCloseDay("Close")}>
                                    <i className="fas fa-lock"/>
                                    <span>{closeDayLabel}</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-settings-gear-65"/>
                                    <span>{settingsLabel}</span>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem href="#" onClick={(e) => {
                                    e.preventDefault();
                                    props.Logout();
                                }}>
                                    <i className="ni ni-user-run"/>
                                    <span>{logoutLabel}</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
