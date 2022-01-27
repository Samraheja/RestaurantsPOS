import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import Modal from "../AppComponents/Modal";
import AddCover from "../../container/Tables/AddCover";
import DailyOpeningClosing from "../../container/DailyOpeningClosing/DailyOpeningClosing";
import SettleBill from "../../container/SettleBill/SettleBill";
import localizedStrings from '../../constants/localizations'

const {
    tablesLabel, settleBillButtonLabel, addCoverTitle, openForDayTitle
} = localizedStrings;

const Tables = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="border-0">
                                <span className="font-weight-bold">{tablesLabel}</span>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {
                                        [...Array(props.noOfTables)].map((value, i) =>
                                            <Col lg="2" md="3" className="cursor-pointer">
                                                <div
                                                    key={i}
                                                    className={props.tablesStatus[i + 1] ? "occupiedTables" : "tables"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.onTableClick(
                                                            props.tablesStatus[i + 1] && props.tablesStatus[i + 1].id,
                                                            (i + 1),
                                                            props.tablesStatus[i + 1] && props.tablesStatus[i + 1].isOrderCompleted
                                                        )
                                                    }}
                                                >
                                                    <Row>
                                                        <Col lg="6" className="font-weight-bold small">
                                                            {i + 1}
                                                        </Col>
                                                        <Col lg="6" className="font-weight-bold small">
                                                            {
                                                                props.tablesStatus[i + 1] &&
                                                                <i className="fa fa-rupee-sign"/>
                                                            }
                                                            {
                                                                props.tablesStatus[i + 1] && " " + props.tablesStatus[i + 1].netAmount
                                                            }
                                                        </Col>
                                                    </Row>
                                                    {
                                                        props.tablesStatus[i + 1] &&
                                                        <Row>
                                                            <Col lg="12" className="text-right">
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle
                                                                        className="btn-icon-only text-dark"
                                                                        href="#sahil"
                                                                        role="button"
                                                                        size="sm"
                                                                        color=""
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-ellipsis-v"/>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                                        {
                                                                            !props.tablesStatus[i + 1].isOrderCompleted &&
                                                                            <DropdownItem
                                                                                href="#sahil"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    props.onVoidBill(
                                                                                        props.tablesStatus[i + 1] && props.tablesStatus[i + 1].id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Void Bill
                                                                            </DropdownItem>
                                                                        }

                                                                        {
                                                                            props.tablesStatus[i + 1].isOrderCompleted &&
                                                                            <DropdownItem
                                                                                href="#sahil"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    props.onSettleBill(
                                                                                        props.tablesStatus[i + 1].id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {settleBillButtonLabel}
                                                                            </DropdownItem>
                                                                        }
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </Col>
                                                        </Row>
                                                    }
                                                </div>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </CardBody>
                        </Card>
                    </div>

                    <Modal
                        isActive={props.showCover}
                        title={addCoverTitle}
                        switchModal={() => props.switchModal('showCover')}
                        renderScene={<AddCover tableNumber={props.tableNumber} orderType={props.orderType}
                                               history={props.history}/>}
                    />

                    <Modal
                        isActive={props.isOpenForDayActive}
                        title={openForDayTitle}
                        switchModal={() => props.switchModal('isOpenForDayActive')}
                        renderScene={<DailyOpeningClosing
                            switchModal={_ => props.switchModal('isOpenForDayActive')}
                            message="Would you like to open for the day?"
                        />}
                    />

                    <Modal
                        isActive={props.showSettleBill}
                        title={settleBillButtonLabel}
                        className="modal-xl modal-dialog-centered"
                        switchModal={() => props.switchModal('showSettleBill')}
                        renderScene={
                            <SettleBill
                                billId={props.billId}
                            />
                        }
                    />
                </Row>
            </Container>
        </>
    )
};

export default Tables;