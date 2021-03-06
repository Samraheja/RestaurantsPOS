import React from "react";
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Button,
    FormGroup,
    Row,
    Col,
    Table
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Select from "../AppComponents/select/SelectComp";
import localizedStrings from '../../constants/localizations'

const {
    addMenuItemLabel, categoryLabel, subcategoryLabel, measuringUnitLabel, pricingLabel, deliveryPriceLabel,
    gstLabel, isVegLabel, isDiscountApplicableLabel, descriptionLabel, backLabel,
    takeAwayPriceLabel, itemCodeLabel, nameLabel, tablePriceLabel
} = localizedStrings;

const AddMenu = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <Col lg="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{addMenuItemLabel}</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="6">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="categoryId"
                                                    >
                                                        {categoryLabel}
                                                    </label>
                                                    {
                                                        props.categories && Array.isArray(props.categories) &&
                                                        <Select
                                                            id="categoryId"
                                                            className="form-control form-control-alternative"
                                                            value={props.categoryId}
                                                            onChange={props.onChange}
                                                            error={props.errorMessages.categoryId}
                                                            showDefault={true}
                                                            options={props.categories.map((category) => ({
                                                                text: category.categoryName,
                                                                value: category.id
                                                            }))}
                                                        >
                                                        </Select>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="subCategoryId"
                                                    >
                                                        {subcategoryLabel}
                                                    </label>
                                                    {
                                                        props.subCategories && Array.isArray(props.subCategories) &&
                                                        <Select
                                                            id="subCategoryId"
                                                            className="form-control form-control-alternative"
                                                            value={props.categoryId}
                                                            onChange={props.onChange}
                                                            error={props.errorMessages.subCategoryId}
                                                            showDefault={false}
                                                            options={props.subCategories.map((subCategory) => ({
                                                                text: subCategory.subCategoryName,
                                                                value: subCategory.id
                                                            }))}
                                                        >
                                                        </Select>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="6" className="py-5 mt-2">
                                        <div className="card-profile-image">
                                            <img
                                                alt="..."
                                                className="rounded-circle cursor-pointer"
                                                src={props.menuPic ||
                                                    require("../../assets/img/theme/UploadMenuBlank.png")
                                                        .default
                                                }
                                                onClick={props.onEditMenuPic}
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            className="d-none"
                                            ref={props.inputMenuPic}
                                            onChange={props.onMenuPicSelect}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="itemCode"
                                            >
                                                {itemCodeLabel}
                                            </label>
                                            <Input
                                                id="itemCode"
                                                placeholder="Enter Item Code"
                                                type="text"
                                                className="form-control-alternative"
                                                value={props.itemCode}
                                                onChange={props.onChange}
                                                error={props.errorMessages.itemCode}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="name"
                                            >
                                                {nameLabel}
                                            </label>
                                            <Input
                                                id="name"
                                                placeholder="Enter Menu Item Name"
                                                type="text"
                                                className="form-control-alternative"
                                                value={props.name}
                                                onChange={props.onChange}
                                                error={props.errorMessages.name}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="measurementGroupId"
                                            >
                                                {measuringUnitLabel}
                                            </label>
                                            {
                                                props.measuringUnits && Array.isArray(props.measuringUnits) &&
                                                <Select
                                                    id="measurementGroupId"
                                                    className="form-control form-control-alternative"
                                                    value={props.measurementGroupId}
                                                    onChange={props.onChange}
                                                    error={props.errorMessages.measurementGroupId}
                                                    showDefault={true}
                                                    options={props.measuringUnits.map((unit) => ({
                                                        text: unit.group,
                                                        value: unit.id
                                                    }))}
                                                >
                                                </Select>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {
                                    props.units && props.units.length > 0 &&
                                    <Row>
                                        <Col lg="12">
                                            <label
                                                className="form-control-label"
                                                htmlFor="categoryId"
                                            >
                                                {pricingLabel}
                                            </label>
                                            <Table className="pricingTable align-items-center table-flush " responsive>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col" className="Header"></th>
                                                        <th scope="col" className="Header">{tablePriceLabel}</th>
                                                        <th scope="col" className="Header">{takeAwayPriceLabel}</th>
                                                        <th scope="col" className="Header">{deliveryPriceLabel}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.units.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {item.unit}
                                                                    </td>
                                                                    <td>
                                                                        <Input
                                                                            id="tablePrice"
                                                                            placeholder="Enter Table Price"
                                                                            type="number"
                                                                            className="form-control-alternative"
                                                                            value={props.pricing[item.id] && props.pricing[item.id].tablePrice}
                                                                            onChange={(e) => { props.onPricingChange(e, item.id) }}
                                                                            error={props.errorMessages.tablePrice}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Input
                                                                            id="takeAwayPrice"
                                                                            placeholder="Enter Take Away Price"
                                                                            type="number"
                                                                            className="form-control-alternative"
                                                                            value={props.pricing[item.id] && props.pricing[item.id].takeAwayPrice}
                                                                            onChange={(e) => { props.onPricingChange(e, item.id) }}
                                                                            error={props.errorMessages.takeAwayPrice}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Input
                                                                            id="deliveryPrice"
                                                                            placeholder="Enter Delivery Price"
                                                                            type="number"
                                                                            className="form-control-alternative"
                                                                            value={props.pricing[item.id] && props.pricing[item.id].deliveryPrice}
                                                                            onChange={(e) => { props.onPricingChange(e, item.id) }}
                                                                            error={props.errorMessages.deliveryPrice}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                }
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="gst"
                                            >
                                                {gstLabel}
                                            </label>
                                            <Input
                                                id="gst"
                                                placeholder="Enter GST(%)"
                                                type="number"
                                                className="form-control-alternative"
                                                value={props.gst}
                                                onChange={props.onChange}
                                                error={props.errorMessages.gst}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="IsVeg"
                                            >
                                                {isVegLabel}
                                            </label>
                                            <br />
                                            <label className="custom-toggle">
                                                <Input
                                                    type="checkbox"
                                                    id="isVeg"
                                                    checked={props.isVeg}
                                                    onChange={props.onChange}
                                                />
                                                <span className="custom-toggle-slider rounded-circle" />
                                            </label>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="isDiscountApplicable"
                                            >
                                                {isDiscountApplicableLabel}
                                            </label>
                                            <br />
                                            <label className="custom-toggle">
                                                <Input
                                                    type="checkbox"
                                                    id="isDiscountApplicable"
                                                    checked={props.isDiscountApplicable}
                                                    onChange={props.onChange}
                                                />
                                                <span className="custom-toggle-slider rounded-circle" />
                                            </label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="description"
                                            >
                                                {descriptionLabel}
                                            </label>
                                            <Input
                                                id="description"
                                                placeholder="Enter Description"
                                                type="text"
                                                className="form-control-alternative"
                                                value={props.description}
                                                onChange={props.onChange}
                                                error={props.errorMessages.description}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr className="my-4" />
                                <Row>
                                    <Col className="text-center">
                                        <Button color="primary" type="button" onClick={props.onMenuSave}>
                                            {props.buttonText}
                                        </Button>
                                        <Button color="warning" type="button" onClick={props.onMenuBack}>
                                            {backLabel}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default AddMenu;