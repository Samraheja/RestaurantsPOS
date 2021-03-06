import React, { useState } from "react";
import get from 'lodash/get';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import localizedStrings from '../../constants/localizations'

const {
    actionLabel, somethingElseLabel, anotherActionLabel, myProfileLabel,
    settingsLabel, activityLabel, supportLabel, logoutLabel
} = localizedStrings;

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();

    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    // closes the collapse
    const closeCollapse = () => {
        setCollapseOpen(false);
    };
    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
        return routes.filter(x => (x.layout === "/admin" && get(x, 'isMenuItem', true)))
            .map((prop, key) => {
                return (
                    <NavItem key={key}>
                        <NavLink
                            to={prop.layout + prop.path}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                            className={prop.className}
                        >
                            <i className={prop.icon}/>
                            {prop.name}
                        </NavLink>
                    </NavItem>
                );
            });
    };

    const { routes, logo } = props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }

    return (
        <Navbar
            className="navbar-vertical p-0 fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                {logo ? (
                    <NavbarBrand className="pt-0 pb-0" {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img LogoImgSidebar"
                            src={logo.profilePic || logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav className="nav-link-icon">
                            <i className="ni ni-bell-55"/>
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >
                            <DropdownItem>{actionLabel}</DropdownItem>
                            <DropdownItem>{anotherActionLabel}</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>{somethingElseLabel}</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                      alt="..."
                      src={
                          require("../../assets/img/theme/team-1-800x800.jpg")
                              .default
                      }
                  />
                </span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-single-02"/>
                                <span>{myProfileLabel}</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-settings-gear-65"/>
                                <span>{settingsLabel}</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-calendar-grid-58"/>
                                <span>{activityLabel}</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-support-16"/>
                                <span>{supportLabel}</span>
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                <i className="ni ni-user-run"/>
                                <span>{logoutLabel}</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Collapse navbar isOpen={collapseOpen}>
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc}/>
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc}/>
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span/>
                                    <span/>
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <Form className="mt-4 mb-3 d-md-none">
                        <InputGroup className="input-group-rounded input-group-merge">
                            <Input
                                aria-label="Search"
                                className="form-control-rounded form-control-prepended"
                                placeholder="Search"
                                type="search"
                            />
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <span className="fa fa-search"/>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                    <Nav navbar>{createLinks(routes)}</Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
