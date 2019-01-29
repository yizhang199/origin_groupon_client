import React from "react";
import { connect } from "react-redux";

import OrderItemCard from "./OrderItemCard";

import "../css/ShoppingCart.css";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showList: false };
  }

  /**
   * calculate total quantity of shopping cart list
   * @returns {Integer} total quantity of shopping cart list
   */
  getTotal = () => {
    let count = 0;
    this.props.shoppingCartList.map(orderItem => {
      count += orderItem.quantity;
    });

    return count;
  };

  /**
   * render quantity badge for shopping cart icon
   * @returns {JSX} badge of quantity
   */
  renderQuantityBadge = () => {
    const count = this.getTotal();
    if (count > 0) {
      return (
        <span className="component-shopping-cart__icon-quantity">{count}</span>
      );
    }
    return null;
  };

  /**
   * render jsx for shopping cart icon
   * @returns {JSX} icon of shopping cart and quantity badge
   */
  renderIcon = () => {
    if (this.state.showList) {
      return null;
    }
    return (
      <div className="component-shopping-cart__icon-container">
        <i className="material-icons">shopping_cart</i>

        {this.renderQuantityBadge()}
      </div>
    );
  };

  /**
   * render jsx for shopping cart list
   * @returns {JSX} list of OrderItemCard
   */
  renderList = () => {
    if (this.state.showList && this.props.shoppingCartList.length > 0) {
      return (
        <div className="component-shopping-cart__list">
          {this.props.shoppingCartList.map((orderItem, index) => {
            return (
              <OrderItemCard orderItem={orderItem} key={`orderItem${index}`}>
                {orderItem.item.name}
              </OrderItemCard>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  /**
   * control show / hide shopping cart list
   * @param {void}
   * @returns {void}
   */
  toggleList = () => {
    if (this.props.shoppingCartList.length > 0) {
      this.setState({ showList: !this.state.showList });
    }
  };
  render() {
    return (
      <div className="component-shopping-cart">
        <div
          onClick={this.toggleList}
          className="component-shopping-cart__header"
        >
          {this.renderIcon()}
        </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ shoppingCartList }) => {
  return { shoppingCartList };
};

export default connect(mapStateToProps)(ShoppingCart);
