import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
} from "reactstrap";
import Input from "../AppComponents/input/InputComp";
import Select from "../AppComponents/select/SelectComp";
import localizedStrings from '../../constants/localizations'

const {
    categoryLabel, subcategoryLabel
} = localizedStrings;

const AddSubCategory = (props) => {
    return (
        <>
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
                            htmlFor="subCategory"
                        >
                            {subcategoryLabel}
                        </label>
                        <Input
                            className="form-control-alternative"
                            id="subCategory"
                            placeholder="Enter Sub Category"
                            type="text"
                            value={props.subCategory}
                            onChange={props.onChange}
                            error={props.errorMessages.subCategory}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button color="primary" type="button" onClick={props.onSubCategorySave}>
                        {props.buttonText}
                    </Button>
                </Col>
            </Row>
        </>
    )
};

export default AddSubCategory;