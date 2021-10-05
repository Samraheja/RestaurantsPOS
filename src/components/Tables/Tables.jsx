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
import ShowModal from "../AppComponents/Modal/Modal";
import AddCover from "../../container/Tables/AddCover";
import DailyOpeningClosing from "../../container/DailyOpeningClosing/DailyOpeningClosing";
import SettleBill from "../../container/SettleBill/SettleBill";

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
                                <span className="font-weight-bold">Tables</span>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {
                                        [...Array(props.noOfTables)].map((e, i) =>
                                            <Col lg="2" md="3" className="cursor-pointer">
                                                <div
                                                    key={i}
                                                    className={props.tablesStatus[i + 1] ? "occupiedTables" : "tables"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.onTableClick(
                                                            props.tablesStatus[i + 1] && props.tablesStatus[i + 1].id,
                                                            (i + 1)
                                                        )
                                                    }}
                                                >
                                                    <Row>
                                                        <Col lg="6" className="font-weight-bold small">
                                                            {i + 1}
                                                        </Col>
                                                        <Col lg="6" className="font-weight-bold small">
                                                            {
                                                                props.tablesStatus[i + 1] && <i className="fa fa-rupee-sign"></i>
                                                            }
                                                            {
                                                                props.tablesStatus[i + 1] && " " + props.tablesStatus[i + 1].totalAmount
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
                                                                        onClick={(e) => { e.stopPropagation(); }}
                                                                    >
                                                                        <i className="fas fa-ellipsis-v" />
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                                        <DropdownItem
                                                                            href="#sahil"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation(); props.onVoidBill(
                                                                                    props.tablesStatus[i + 1] && props.tablesStatus[i + 1].id
                                                                                );
                                                                            }}
                                                                        >
                                                                            Void Bill
                                                                        </DropdownItem>

                                                                        {
                                                                            props.tablesStatus[i + 1].isOrderCompleted &&
                                                                            <DropdownItem
                                                                                href="#sahil"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation(); props.onSettleBill(
                                                                                        props.tablesStatus[i + 1].id,
                                                                                        props.tablesStatus[i + 1].tableNumber,
                                                                                        props.tablesStatus[i + 1].billNumber,
                                                                                        props.tablesStatus[i + 1].netAmount
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Settle Bill
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

                    {
                        props.showCover &&
                        <ShowModal
                            title="Add Cover"
                            switchModal={props.switchModal}
                            formComponent={<AddCover tableNumber={props.tableNumber} orderType={props.orderType} history={props.history} />}
                        />
                    }

                    {
                        !props.isOpenedForDay &&
                        <ShowModal
                            title="Open for day"
                            switchModal={props.switchModal}
                            formComponent={<DailyOpeningClosing message="Would you like to open for the day?" />}
                        />
                    }

                    {
                        props.showSettleBill &&
                        <ShowModal
                            title="Settle Bill"
                            className="modal-xl modal-dialog-centered"
                            switchModal={props.switchModal}
                            formComponent={
                                <SettleBill
                                    billId={props.billId}
                                    tableNumber={props.tableNumber}
                                    billNumber={props.billNumber}
                                    netAmount={props.netAmount}
                                />
                            }
                        />
                    }
                </Row>
            </Container>
        </>
    )
};

export default Tables;