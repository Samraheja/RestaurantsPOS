import React from "react";
import OrderListComp from "../../components/Order/OrderList";

const OrderList = (props) => {

    return (
        <OrderListComp
            orderedItems={props.orderedItems}
            onQuantityUpdate={props.onQuantityUpdate}
        />
    )
};

export default OrderList;