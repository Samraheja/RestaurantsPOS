import React from "react";
import {
    Card,
    CardBody,
    Container,
    Row,
    Col
} from "reactstrap";
import MostOrdered from "../../container/Order/MostOrdered";
import AutoComplete from "../../container/Order/AutoComplete";
import OrderList from "../../container/Order/OrderList";
import BillSummary from "../../container/Order/BillSummary";
import CustomerSummary from "../../container/Order/CustomerSummary";
import Modal from "../AppComponents/Modal";
import Pricing from "../Menu/Pricing";
import localizedStrings from "../../constants/localizations";

const {
    displayForOrder, selectOrderQuantity, displayTablePrice
} = localizedStrings

const Order = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-6">
            </div>
            <Container className="mt--8" fluid>
                <Row>
                    <Col lg="6" className="p-1">
                        <Card className="bg-secondary shadow">
                            <CardBody>
                                <MostOrdered
                                    tableNumber={props.billingDetails.tableNumber}
                                    onMenuItemAdd={props.onMenuItemAdd}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" className="p-1">
                        <Card className="bg-secondary shadow">
                            <CardBody>
                                <AutoComplete
                                    onMenuItemAdd={props.onMenuItemAdd}
                                />
                                <OrderList
                                    orderedItems={props.orderedItems}
                                    onQuantityUpdate={props.onQuantityUpdate}
                                />
                                <hr className="m-0"/>
                                <Row>
                                    <Col lg="6" className="p-1 tblOrderSummary border-right">
                                        <CustomerSummary
                                            customerId={props.billingDetails.customerId}
                                            billId={props.billingDetails.id}
                                            customerInfo={props.customerInfo}
                                            paymentMode={props.paymentMode}
                                            onChange={props.onChange}
                                        />
                                    </Col>
                                    <Col lg="6" className="p-1 tblOrderSummary">
                                        <BillSummary
                                            billingDetails={props.billingDetails}
                                            discount={props.discount}
                                            discountAmount={props.discountAmount}
                                            netAmount={props.netAmount}
                                            buttonText={props.buttonText}
                                            onChange={props.onChange}
                                            onCompleteOrder={props.onCompleteOrder}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                isActive={props.showPricing}
                title={selectOrderQuantity}
                switchModal={() => props.switchModal('showPricing')}
                bodyClassName="modal-body p-0"
                renderScene={
                    <Pricing
                        switchModal={() => props.switchModal('showPricing')}
                        pricing={props.pricing}
                        displayFor={displayForOrder}
                        displayPrice={displayTablePrice}
                        onVariantSelect={props.onVariantSelect}
                    />
                }
            />
        </>
    )
};

export default Order;