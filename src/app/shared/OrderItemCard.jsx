import React from "react";
import { connect } from "react-redux";

import { increaseOrderItem, decreaseOrderItem } from "../../_actions";

// import "../css/OrderItemCard.css";

class OrderItemCard extends React.Component {
  makePrice = value => {
    if (value == 0) {
      return `Free`;
    } else {
      return `$${value}`;
    }
  };
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
  renderChoices = () => {
    if (this.props.orderItem.item.choices) {
      return this.props.orderItem.item.choices.map((choice, index) => {
        if (Array.isArray(choice.productOptionValue)) {
          return choice.productOptionValue.map((value, index) => {
            return (
              <div
                className="component-order-item-card__option-value"
                key={`value${index}`}
              >
                <span className="component-order-item-card__option-name">
                  {value.name}
                </span>
                <span className="component-order-item-card__option-price">
                  {this.makePrice(value.price)}
                </span>
              </div>
            );
          });
        } else {
          return (
            <div
              className="component-order-item-card__option-value"
              key={`choice${index}`}
            >
              <span className="component-order-item-card__option-name">
                {choice.productOptionValue.name}
              </span>
              <span className="component-order-item-card__option-price">
                {this.makePrice(choice.productOptionValue.price)}
              </span>
            </div>
          );
        }
      });
    }

    return null;
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
          {this.renderChoices()}
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
