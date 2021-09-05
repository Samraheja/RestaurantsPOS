import React from "react";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

const Paginations = (props) => {
    const [pages, setPages] = useState([]);
    const [state, setState] = useState({
        prevDisabled: "disabled",
        nextDisabled: "disabled"
    });

    const status = {
        hasPrev: false,
        hasNext: true
    }

    useEffect(() => {
        const allPages = [];

        setState(prevState => ({
            ...prevState,
            prevDisabled: props.pageNo > 1 ? "" : "disabled",
            nextDisabled: props.pageNo < props.totalPages ? "" : "disabled"
        }));

        if (props.totalPages <= 1) {
            allPages.push(1);
        }
        else if (props.totalPages === 2) {
            allPages.push(1);
            allPages.push(2);
        }
        else {
            if (props.pageNo === 1) {
                allPages.push(props.pageNo);
                allPages.push(props.pageNo + 1);
                allPages.push(props.pageNo + 2);
            }
            else if (props.pageNo === props.totalPages) {
                allPages.push(props.pageNo - 2);
                allPages.push(props.pageNo - 1);
                allPages.push(props.pageNo);
            }
            else {
                allPages.push(props.pageNo - 1);
                allPages.push(props.pageNo);
                allPages.push(props.pageNo + 1);
            }
        }

        setPages(allPages);
    }, [props.totalPages, props.pageNo, status.hasPrev, status.hasNext, state.prevDisabled, state.nextDisabled]);

    return (
        <>
            <nav aria-label="...">
                <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                >
                    <PaginationItem className={state.prevDisabled}>
                        <PaginationLink
                            href="#sahil"
                            onClick={(e) => { e.preventDefault(); props.onPageChange(props.pageNo - 1); }}
                            tabIndex="-1"
                        >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                        </PaginationLink>
                    </PaginationItem>
                    {
                        pages &&
                        pages.map((page, i) => {
                            return (
                                <PaginationItem
                                    className={page === props.pageNo ? "active" : ""}
                                    key={i}
                                >
                                    <PaginationLink
                                        href="#sahil"
                                        onClick={(e) => { e.preventDefault(); props.onPageChange(e.target.text); }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                    <PaginationItem className={state.nextDisabled}>
                        <PaginationLink
                            href="#sahil"
                            onClick={(e) => { e.preventDefault(); props.onPageChange(props.pageNo + 1); }}
                        >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </nav>
        </>
    )
};

export default Paginations;