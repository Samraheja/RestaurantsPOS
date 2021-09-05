import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Col
} from "reactstrap";
import ShowModal from "../AppComponents/Modal/Modal";
import AddCover from "../../container/Tables/AddCover";

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
                                                    {i + 1}
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
                            showModal={props.showModal}
                            switchModal={props.switchModal}
                            formComponent={<AddCover tableNumber={props.tableNumber} orderType={props.orderType} history={props.history} />}
                        />
                    }
                </Row>
            </Container>
        </>
    )
};

export default Tables;