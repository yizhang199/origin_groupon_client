import React from "react";

const OrderCard = props => {
  return (
    <div className="component-order-card">
      <p>{props.order.store_name}</p>
      <p>{props.order.picked_date}</p>
    </div>
  );
};

export default OrderCard;
