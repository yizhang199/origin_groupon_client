import React from "react";
import { connect } from "react-redux";

import { increaseOrderItem, decreaseOrderItem } from "../actions";

import "../css/OrderItemCard.css";

class OrderItemCard extends React.Component {
  increase = () => {
    this.props.increaseOrderItem(this.props.orderItem);
  };
  decrease = () => {
    this.props.decreaseOrderItem(this.props.orderItem);
  };
  render() {
    return (
      <div className="component-order-item-card">
        {this.props.orderItem.item.name} x {this.props.orderItem.quantity}
      </div>
    );
  }
}

export default connect(
  null,
  { increaseOrderItem, decreaseOrderItem }
)(OrderItemCard);
