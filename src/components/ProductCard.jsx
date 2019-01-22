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
      if (orderItem.product_id === this.props.product_id) {
        counter++;
      }
    });

    return counter;
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
              <div className="component-product_card__button-group">
                <i className="material-icons">remove_circle</i>
                <span>{this.getQuantity()}</span>
                <i className="material-icons">add_circle</i>
              </div>
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
