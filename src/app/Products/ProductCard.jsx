import React from "react";

import {
  addToShoppingCartList,
  decreaseFromShoppingCartList,
  showModal
} from "../../_actions";
import { connect } from "react-redux";

import ChoiceForm from "./ChoiceForm";
// import Modal from "./Modal";
import { baseUrl } from "../../_apis";

// import "./sass/ProductCard.css";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showChoiceForm: false };
  }
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

  toggleOptionForm = () => {
    this.setState({ showChoiceForm: !this.state.showChoiceForm });
    // this.props.showModal();
  };

  renderGroupOnTag = () => {
    if (!this.props.product.isDiscount) {
      return null;
    }
    return <span className="groupon-tag">团</span>;
  };
  decrease = () => {
    this.props.decreaseFromShoppingCartList(this.props.product);
  };
  add = () => {
    this.props.addToShoppingCartList(this.props.product);
  };
  renderButtonGroup = () => {
    const quantity = this.getQuantity();
    const withOptions = this.props.product.options.length > 0;
    if (!withOptions && quantity > 0) {
      return (
        <div className="component-product_card__button-group">
          <i onClick={this.decrease} className="material-icons">
            remove_circle
          </i>
          <span className="component-product-card__product-quantity">
            {quantity}
          </span>
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else if (!withOptions) {
      return (
        <div className="component-product_card__button-group-init">
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else if (withOptions && quantity == 0) {
      return (
        <div className="component-product_card__button-group-init">
          <i onClick={this.toggleOptionForm} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else {
      return (
        <div className="component-product_card__button-group">
          <i className="material-icons disable">remove_circle</i>
          <span className="component-product-card__product-quantity">
            {quantity}
          </span>
          <i onClick={this.toggleOptionForm} className="material-icons">
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
        {this.renderGroupOnTag()}
        <div className="component-product-card__header">
          <div className="component-product-card__image-container">
            <img src={`${baseUrl}${this.props.product.image}`} alt="" />
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
                {this.props.product.stock_status_id -
                  this.props.product.quantity}
                /{this.props.product.stock_status_id}
              </div>
              {this.renderButtonGroup()}
            </div>
          </div>
        </div>

        {this.state.showChoiceForm ? (
          <React.Fragment>
            <div
              onClick={this.toggleOptionForm}
              className="componente_product-card__cover"
            />
            <ChoiceForm
              toggleOptionForm={this.toggleOptionForm}
              product={this.props.product}
            />
          </React.Fragment>
        ) : null}
        {this.props.product.quantity === 0 ? (
          <div className="component-product-cover" />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ shoppingCartList }) => {
  return { shoppingCartList };
};

export default connect(
  mapStateToProps,
  { addToShoppingCartList, decreaseFromShoppingCartList, showModal }
)(ProductCard);
