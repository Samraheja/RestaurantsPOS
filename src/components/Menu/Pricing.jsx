import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Table,
    Button
} from 'reactstrap';
import localizedStrings from '../../constants/localizations';

const {
    displayForMenu, tablePriceHeaderLabel, deliveryPriceHeaderLabel, takeAwayPriceHeaderLabel,
    displayTablePrice, displayTakeAwayPrice, displayDeliveryPrice
} = localizedStrings;

const Pricing = (props) => {
    const [selectedIndex, setIndex] = useState(0);

    const onSelect = (index) => {
        setIndex(index);
    }

    return (
        <>
            {
                props.displayFor == displayForMenu
                    ?
                    <Card className="shadow">
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="Header background">
                                        <div><span class="bottom">Unit</span>
                                            <span class="top">Price</span>
                                            <div class="line"></div>
                                        </div>
                                    </th>
                                    <th scope="col" className="Header">{tablePriceHeaderLabel}</th>
                                    <th scope="col" className="Header">{deliveryPriceHeaderLabel}</th>
                                    <th scope="col" className="Header">{takeAwayPriceHeaderLabel}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.pricing &&
                                    props.pricing.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {item.unit}
                                                </td>
                                                <td>
                                                    {item.tablePrice}
                                                </td>
                                                <td>
                                                    {item.deliveryPrice}
                                                </td>
                                                <td>
                                                    {item.takeAwayPrice}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>
                    :
                    <Card className="shadow">
                        <Row>
                            {
                                props.pricing &&
                                props.pricing.map((item, index) => {
                                    return (
                                        <Col key={index} lg="6 p-2 pl-5 pr-5 cursor-pointer" onClick={() => onSelect(index)}>
                                            <div className={`pricingDiv ${index === selectedIndex ? "priceSelected" : ""}`}>
                                                <div className="d-flex">
                                                    <h3 className="m-0">
                                                        <i className="fa fa-rupee-sign pr-1" />
                                                        {
                                                            props.displayPrice == displayTablePrice ? item.tablePrice
                                                                :
                                                                (props.displayPrice == displayTakeAwayPrice ? item.takeAwayPrice
                                                                    :
                                                                    item.deliveryPrice)
                                                        }
                                                    </h3>
                                                    <i className={`check ${index === selectedIndex ? "fa fa-duotone fa-check" : ""}`} />
                                                </div>
                                                <div className="text-right">{item.unit}</div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <hr className="my-2" />
                        <Row>
                            <Col className="text-right pr-5 pb-3">
                                <Button color="danger" type="button" onClick={() => props.onVariantSelect(props.pricing[selectedIndex].unitId, props.pricing[selectedIndex].tablePrice)}>
                                    Add Item
                                </Button>
                            </Col>
                        </Row>
                    </Card>
            }
        </>
    )
};

export default Pricing;