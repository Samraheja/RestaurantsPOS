import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    Container,
    Row
} from "reactstrap";
import Pagination from "../AppComponents/Pagination/Pagination";

const Menu = (props) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <span className="font-weight-bold">Menu</span>
                                <i className="fas fa-plus-circle fa-2x float-right text-yellow cursor-pointer" onClick={props.openAddMenu}></i>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="Header">Sr. No. </th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("CategoryName")}>Category</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("SubCategoryName")}>Sub Category</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("ItemCode")}>Item Code</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("Name")}>Name</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("TablePrice")}>Table Price</th>
                                        <th scope="col" className="Header" onClick={() => props.SortRecords("IsVeg")}>Veg/Non Veg</th>
                                        <th scope="col" className="Header" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.menu &&
                                        props.menu.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.category.categoryName}
                                                    </td>
                                                    <td>
                                                        {item.subCategory.subCategoryName}
                                                    </td>
                                                    <td>
                                                        {item.itemCode}
                                                    </td>
                                                    <td>
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        {item.tablePrice}
                                                    </td>
                                                    <td>
                                                        {item.isVeg === true ? "Veg" : "Non Veg"}
                                                    </td>
                                                    <td className="text-right">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#sahil"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem
                                                                    href="#sahil"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.onMenuEdit(
                                                                            item.id
                                                                        )
                                                                    }}
                                                                >
                                                                    Edit
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    href="#sahil"
                                                                    onClick={(e) => { e.preventDefault(); props.onMenuDelete(item.id) }}
                                                                >
                                                                    Delete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <Pagination
                                    totalPages={props.totalPages}
                                    pageNo={props.pageNo}
                                    onPageChange={props.onPageChange}
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
};

export default Menu;