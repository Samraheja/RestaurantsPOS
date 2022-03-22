import react, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/AppComponents/Loader/Loader";
import CustomersComp from "../../components/Customers/Customers";
import { CustomersDefaults, GlobalConstants, SuccessMessages } from "../../constants/constants";
import { getCustomers } from "../../redux-store/actions/customer";

const Customers = (props) => {
    const [state, setState] = useState({
        ...CustomersDefaults
    });

    const dispatch = useDispatch();
    const { totalRecords, totalPages, customers, isLoading } = useSelector(state => state.customer);

    useEffect(() => {
        const payload = {
            CollectionName: "Customers",
            PageNo: state.pageNo,
            Limit: GlobalConstants.Limit,
            SortColumn: state.sortBy + " " + state.order,
            SearchValue: state.searchValue
        };

        dispatch(getCustomers({
            params: payload,
            dispatch
        }));
    }, [state, dispatch]);

    const SortRecords = (column) => {
        setState(prevState => ({
            ...prevState,
            sortBy: column,
            order: prevState.sortBy == column ? state.order == "asc" ? "desc" : "asc" : "asc"
        }));
    };

    const onPageChange = (newPageNo) => {
        setState(prevState => ({
            ...prevState,
            pageNo: parseInt(newPageNo)
        }));
    };

    const onSettleDuesClick = (customerId) => {
        props.history.push("/admin/settledues", customerId);
    }

    if (isLoading) {
        return <Loader />
    }
    else {
        return (
            <CustomersComp
                totalRecords={totalRecords}
                totalPages={totalPages}
                customers={customers}
                pageNo={state.pageNo}
                onPageChange={onPageChange}
                SortRecords={SortRecords}
                onSettleDuesClick={onSettleDuesClick}
            />
        )
    }
}

export default Customers;
