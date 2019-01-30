import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import OrderItemCard from "./OrderItemCard";
import { history } from "../history";

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
   * calculate total price of shoppingCartList
   * @param {Void}
   * @returns {decimal} total price/cost of ordered items
   */
  getTotalPrice = () => {
    let sum = 0;
    this.props.shoppingCartList.map(orderItem => {
      console.log(orderItem);
      let price = parseFloat(orderItem.item.price);
      if (orderItem.item.choices) {
        orderItem.item.choices.map(choice => {
          if (Array.isArray(choice.productOptionValue)) {
            choice.productOptionValue.map(value => {
              price += parseFloat(value.price);
            });
          } else {
            price += parseFloat(choice.productOptionValue.price);
          }
        });
      }

      sum += price * orderItem.quantity;
    });

    return `$${sum.toFixed(2)}`;
  };
  /**
   * route to Confirm.jsx programic
   * @param {Void}
   * @returns {Void}
   */
  navToConfirm = () => {
    history.push("/confirm");
  };

  /**
   * render jsx for shopping cart list
   * @returns {JSX} list of OrderItemCard
   */
  renderList = () => {
    if (this.state.showList && this.props.shoppingCartList.length > 0) {
      return (
        <React.Fragment>
          <div
            className="component-shopping-cart__cover"
            onClick={this.toggleList}
          />
          <div className="component-shopping-cart__list">
            <div className="component-shopping-cart__list__header">
              <span className="component-shopping-cart__list__header-quantity">
                <i className="material-icons">shopping_cart</i>
                <span className="component-shopping-cart__list__header-quantity__number">
                  {this.getTotal()}
                </span>
              </span>
              <span className="component-shopping-cart__list__header-totoalPrice">
                {this.getTotalPrice()}
              </span>
            </div>
            {this.props.shoppingCartList.map((orderItem, index) => {
              return (
                <OrderItemCard orderItem={orderItem} key={`orderItem${index}`}>
                  {orderItem.item.name}
                </OrderItemCard>
              );
            })}
            <div className="component-shopping-cart__list__footer">
              <Link
                onClick={this.toggleList}
                to="/confirm"
                className="component-shopping-cart__list__button-confirm"
              >
                确定
              </Link>
            </div>
          </div>
        </React.Fragment>
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
