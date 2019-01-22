import React from "react";

import {
  addToShoppingCartList,
  decreaseFromShoppingCartList
} from "../actions";
import { connect } from "react-redux";
import "../css/ProductCard.css";

class ProductCard extends React.Component {
  getQuantity = () => {
    let counter = 0;
    this.props.shoppingCartList.map(orderItem => {
      if (
        orderItem.item &&
        orderItem.item.product_id === this.props.product.product_id
      ) {
        counter += orderItem.quantity;
      }
    });

    return counter;
  };

  decrease = () => {
    this.props.decreaseFromShoppingCartList(this.props.product);
  };
  add = () => {
    this.props.addToShoppingCartList(this.props.product);
  };
  renderButtonGroup = () => {
    const quantity = this.getQuantity();
    if (quantity > 0) {
      return (
        <div className="component-product_card__button-group">
          <i onClick={this.decrease} className="material-icons">
            remove_circle
          </i>
          <span>{quantity}</span>
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else {
      return (
        <div className="component-product_card__button-group-init">
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    }
  };
  render() {
    return (
      <div
        className="component-product-card"
        data-test="component-product-card"
      >
        <div className="component-product-card__header">
          <div className="component-product-card__image-container">
            <img src={this.props.product.image} alt="" />
          </div>
          <div className="component-product-card__info">
            <div className="component-product-card__info__header">
              <div
                className="component-product-card__name"
                data-test="product-name"
              >
                {this.props.product.name}
              </div>
              <div className="component-product-card__price">
                ${this.props.product.price}
              </div>
            </div>
            <div className="component-product-card__info__footer">
              <div className="component-product-card__quantity">
                {this.props.product.quantity}/
                {this.props.product.stock_status_id}
              </div>
              {this.renderButtonGroup()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ shoppingCartList }) => {
  return { shoppingCartList };
};

export default connect(
  mapStateToProps,
  { addToShoppingCartList, decreaseFromShoppingCartList }
)(ProductCard);
