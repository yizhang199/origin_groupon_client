import React from "react";
import { connect } from "react-redux";

const OrderItem = ({ orderItem, labels }) => {
  const { name, quantity, total, price } = orderItem;

  return (
    <div className="order-item">
      <div className="information">
        <div className="row name">{name}</div>
        <div className="row unit-price">
          <span className={`title`}>{labels.order_item_unit_price}:</span>{" "}
          <span>{`$${price}`}</span>
        </div>
        <div className="row total">
          <span className="title">{labels.order_item_total}:</span>{" "}
          <span>{`$${total}`}</span>
        </div>
      </div>
      <div className="quantity">{`X ${quantity}`}</div>
    </div>
  );
};

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(mapStateToProps)(OrderItem);
