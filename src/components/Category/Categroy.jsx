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
import Modal from "../AppComponents/Modal/Modal";
import AddCategory from "../../container/Category/AddCategory";
import Pagination from "../AppComponents/Pagination/Pagination";

const Category = (props) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <span className="font-weight-bold">Categories</span>
                <i className="fas fa-plus-circle fa-2x float-right text-yellow cursor-pointer" onClick={props.switchModal}></i>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="Header">Sr. No. </th>
                    <th scope="col" className="Header" onClick={() => props.SortRecords("CategoryName")}>Category</th>
                    <th scope="col" className="Header" />
                  </tr>
                </thead>
                <tbody>
                  {
                    props.categories &&
                    props.categories.map((category, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index + 1}
                          </td>
                          <td>
                            {category.categoryName}
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
                                  onClick={(e) => { e.preventDefault(); props.onCategoryEdit(category.id, category.categoryName) }}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#sahil"
                                  onClick={(e) => { e.preventDefault(); props.onCategoryDelete(category.id) }}
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

      <Modal
        title="Add Category"
        showModal={props.showModal}
        switchModal={props.switchModal}
        formComponent={<AddCategory editCategory={props.editCategory} />}
      />
    </>
  );
};

export default Category;