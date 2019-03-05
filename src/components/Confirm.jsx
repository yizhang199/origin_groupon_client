import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import ShopCard from "./ShopCard";
import Head from "./Head";
import {
  getShops,
  setPaymentMethod,
  makePayment,
  saveOrCreateOrder,
  fetchUser,
  changeCustomerComments
} from "../actions";

import "../css/Confirm.css";
import { baseUrl } from "../apis";
import { makeDate } from "../helpers";
class Confirm extends React.Component {
  /**
   * declare state
   */
  constructor(props) {
    super(props);

    this.state = {
      showShopList: true,
      showPaymentMethod: false,
      showCustomerComments: false
    };
  }
  /**
   * call api fetch shop list
   * @returns update state.shops in redux store
   */
  componentDidMount() {
    this.props.fetchUser();
    this.props.getShops();
  }

  /**
   * render JSX shop list
   * @returns {JSX} list of ShopCard.jsx
   */
  renderShopList = () => {
    if (this.state.showShopList) {
      return this.props.shops.map((shop, index) => {
        return (
          <ShopCard
            toggleSection={this.toggleSection}
            key={`shop${index}`}
            shop={shop}
          />
        );
      });
    } else {
      return null;
    }
  };
  /**
   * toggle section show shop list or show payment method
   * @param {Void}
   * @returns {Void} update this.state.showShopList
   */
  toggleSection = attributeName => {
    this.setState({ [attributeName]: !this.state[attributeName] });
  };
  /**
   * render JSX for section header
   * @param {string} content
   * @param {string} attributeName
   * @returns {JSX} header for each section
   */
  renderSectionHeader = (content, attributeName) => {
    const stateProperty = this.state[attributeName];
    return (
      <div
        onClick={() => {
          this.toggleSection(attributeName);
        }}
        className="component-confirm__section-header"
      >
        <span
          className={`component-confirm__subtitle${
            stateProperty ? " active" : ""
          }`}
        >
          {this.getTitle(content, attributeName)}
        </span>
        <i className="material-icons">
          {stateProperty ? `keyboard_arrow_up` : `keyboard_arrow_down`}
        </i>
      </div>
    );
  };
  /**
   * make section title
   * @param {string} content
   * @param {string} attributeName
   * @returns {string} title
   */
  getTitle = (content, attributeName) => {
    if (attributeName === "showShopList") {
      if (this.props.selectedShop.name && makeDate(this.props.pickedDate)) {
        return `取货地点：${this.props.selectedShop.name} 取货日期：${makeDate(
          this.props.pickedDate
        )}`;
      } else {
        return content;
      }
    }
    if (attributeName === "showPaymentMethod") {
      if (this.props.paymentMethod) {
        return `支付方式：${this.props.paymentMethod}`;
      } else {
        return content;
      }
    }
    return content;
  };
  /**
   * render payment method details
   * @param {Void}
   * @returns {JSX}
   */
  renderPaymentMethod = () => {
    if (this.state.showPaymentMethod) {
      return (
        <div className="payment-section__body">
          <label className="payment-section__radio-label">
            <input
              type="radio"
              name="payment_method"
              value="Paypal"
              onChange={this.handlePaymentMethodChange}
            />
            <span className="payment-section__check-mark-wrapper">
              <img
                className="payment-section__body-img"
                src={`${baseUrl}/images/paypal.png`}
                alt=""
              />
            </span>
          </label>
          <label className="payment-section__radio-label">
            <input
              type="radio"
              name="payment_method"
              value="ALIPAY"
              onChange={this.handlePaymentMethodChange}
            />
            <span className="payment-section__check-mark-wrapper">
              <img
                className="payment-section__body-img"
                src={`${baseUrl}/images/alipay.png`}
                alt=""
              />
            </span>
          </label>
          <label className="payment-section__radio-label">
            <input
              type="radio"
              name="payment_method"
              value="WECHAT"
              onChange={this.handlePaymentMethodChange}
            />
            <span className="payment-section__check-mark-wrapper">
              <img
                className="payment-section__body-img"
                src={`${baseUrl}/images/wechat.png`}
                alt=""
              />
            </span>
          </label>
          {this.props.userAllowCash ? (
            <label className="payment-section__radio-label">
              <input
                type="radio"
                name="payment_method"
                value="CASH"
                onChange={this.handlePaymentMethodChange}
              />
              <span className="payment-section__check-mark-wrapper">
                <img
                  className="payment-section__body-img"
                  src={`${baseUrl}/images/cash.png`}
                  alt="Cash"
                />
              </span>
            </label>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  };
  /**
   * update payment method
   * @param {Event}
   * @returns {Void} update state.paymethod
   */
  handlePaymentMethodChange = e => {
    this.props.setPaymentMethod(e.target.value);
  };
  /**
   * call makepayment action to make payment
   */
  submitPayment = () => {
    this.props.makePayment();
  };
  saveOrder = () => {
    this.props.saveOrCreateOrder(1);
  };
  renderCustomerComments = () => {
    if (this.state.showCustomerComments) {
      return (
        <textarea
          onChange={this.handleCustomerComments}
          value={this.props.customerComments}
          className="component-confirm__customer-comments"
        />
      );
    }
    return null;
  };
  handleCustomerComments = e => {
    this.props.changeCustomerComments(e.target.value);
  };
  render() {
    if (!this.props.labels.app_head_title) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="confirm" />
        <div className="component-confirm">
          {this.renderSectionHeader(
            this.props.labels.subtitle_select_date,
            "showShopList"
          )}
          {this.renderShopList()}
          {this.renderSectionHeader(
            this.props.labels.subtitle_select_payment_method,
            "showPaymentMethod"
          )}
          {this.renderPaymentMethod()}
          {this.renderSectionHeader(
            this.props.labels.subtitle_customer_comments,
            "showCustomerComments"
          )}
          {this.renderCustomerComments()}
          <div className="component-confirm__button-group">
            <button
              className="component-confirm__save-button"
              onClick={this.saveOrder}
            >
              {this.props.labels.save_order}
            </button>
            <button
              onClick={this.submitPayment}
              className="component-confirm__payment-button"
            >
              {this.props.labels.confirm_pay}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  shops,
  paymentMethod,
  labels,
  selectedShop,
  pickedDate,
  userAllowCash,
  customerComments
}) => {
  return {
    shops,
    paymentMethod,
    labels,
    selectedShop,
    pickedDate,
    userAllowCash,
    customerComments
  };
};

export default connect(
  mapStateToProps,
  {
    getShops,
    setPaymentMethod,
    makePayment,
    saveOrCreateOrder,
    fetchUser,
    changeCustomerComments
  }
)(Confirm);
