import React from "react";
import { connect } from "react-redux";

import OrderItemCard from "./OrderItemCard";

import "../css/ShoppingCart.css";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showList: false };
  }
  renderIcon = () => {
    return <div />;
  };
  renderList = () => {
    if (this.state.showList && this.props.shoppingCartList.length > 0) {
      return (
        <div className="component-shopping-cart__list">
          {this.props.shoppingCartList.map((orderItem, index) => {
            return (
              <OrderItem orderItem={orderItem} key={`orderItem${index}`}>
                {orderItem.item.name}
              </OrderItem>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };
  toggleList = () => {
    this.setState({ showList: !this.state.showList });
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
