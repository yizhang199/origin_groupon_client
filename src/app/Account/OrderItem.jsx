import React from "react";

const OrderItem = ({ orderItem }) => {
  const { name, quantity, total, price } = orderItem;

  return (
    <div className="order-item">
      <div className="information">
        <div className="row name">{name}</div>
        <div className="row unit-price">
          <span className={`title`}>{`单价:`}</span> <span>{`$${price}`}</span>
        </div>
        <div className="row total">
          <span className="title">{`小计:`}</span> <span>{`$${total}`}</span>
        </div>
      </div>
      <div className="quantity">{`X ${quantity}`}</div>
    </div>
  );
};

export default OrderItem;
