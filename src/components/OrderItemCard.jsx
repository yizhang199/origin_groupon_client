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

  renderButtonGroup = () => {
    if (this.props.orderItem.quantity > 0) {
      return (
        <div className="component-order-item-card__button-group">
          <i onClick={this.decrease} className="material-icons">
            remove_circle
          </i>
          <span className="component-order-item-card__product-quantity">
            {this.props.orderItem.quantity}
          </span>
          <i onClick={this.increase} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else {
      return (
        <div className="component-order-item-card__button-group-init">
          <i onClick={this.increase} className="material-icons">
            add_circle
          </i>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="component-order-item-card">
        <div className="component-order-item-card__left">
          <span className="component-order-item-card__name">
            {this.props.orderItem.item.name}
          </span>{" "}
        </div>
        <div className="component-order-item-card__middle">
          <span>sample options</span>
        </div>
        <div className="component-order-item-card__right">
          <span className="component-order-item-card__price">
            ${this.props.orderItem.item.price}
          </span>
          {this.renderButtonGroup()}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { increaseOrderItem, decreaseOrderItem }
)(OrderItemCard);
