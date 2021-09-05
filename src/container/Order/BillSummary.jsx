import React from "react";
import BillSummaryComp from "../../components/Order/BillSummary";

const BillSummary = (props) => {

    return (
        <BillSummaryComp
            discount={props.discount}
            discountAmount={props.discountAmount}
            netAmount={props.netAmount}
            onChange={props.onChange}
            billingDetails={props.billingDetails}
            onCompleteOrder={props.onCompleteOrder}
        />
    )
};

export default BillSummary;