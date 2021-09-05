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
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Select from "../AppComponents/select/SelectComp";

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
                                        <h3 className="mb-0">Add Menu Item</h3>
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
                                                        Category
                                                    </label>
                                                    {
                                                        props.categories && Array.isArray(props.categories) &&
                                                        <Select
                                                            id="categoryId"
                                                            className="form-control form-control-alternative"
                                                            value={props.categoryId}
                                                            onChange={props.onChange}
                                                            disabled={props.id > 0 ? true : false}
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
                                                        Sub Category
                                                    </label>
                                                    {
                                                        props.subCategories && Array.isArray(props.subCategories) &&
                                                        <Select
                                                            id="subCategoryId"
                                                            className="form-control form-control-alternative"
                                                            value={props.categoryId}
                                                            onChange={props.onChange}
                                                            disabled={props.id > 0 ? true : false}
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
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="name"
                                            >
                                                Name
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
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="tablePrice"
                                            >
                                                Table Price
                                            </label>
                                            <Input
                                                id="tablePrice"
                                                placeholder="Enter Table Price"
                                                type="number"
                                                className="form-control-alternative"
                                                value={props.tablePrice}
                                                onChange={props.onChange}
                                                error={props.errorMessages.tablePrice}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="takeAwayPrice"
                                            >
                                                Take Away Price
                                            </label>
                                            <Input
                                                id="takeAwayPrice"
                                                placeholder="Enter Take Away Price"
                                                type="number"
                                                className="form-control-alternative"
                                                value={props.takeAwayPrice}
                                                onChange={props.onChange}
                                                error={props.errorMessages.takeAwayPrice}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="deliveryPrice"
                                            >
                                                Delivery Price
                                            </label>
                                            <Input
                                                id="deliveryPrice"
                                                placeholder="Enter Delivery Price"
                                                type="number"
                                                className="form-control-alternative"
                                                value={props.deliveryPrice}
                                                onChange={props.onChange}
                                                error={props.errorMessages.deliveryPrice}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="gst"
                                            >
                                                GST(%)
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
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="IsVeg"
                                            >
                                                Is Veg
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
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="description"
                                            >
                                                Description
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
                                            Back
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