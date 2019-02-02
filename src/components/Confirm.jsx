import React from "react";
import { connect } from "react-redux";

import ShopCard from "./ShopCard";
import Head from "./Head";
import {
  getShops,
  setPaymentMethod,
  makePayment,
  saveOrCreateOrder,
  fetchUser
} from "../actions";

import "../css/Confirm.css";
class Confirm extends React.Component {
  /**
   * declare state
   */
  constructor(props) {
    super(props);

    this.state = { showShopList: true, showPaymentMethod: false };
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
  toggleSection = () => {
    this.setState({
      showShopList: !this.state.showShopList,
      showPaymentMethod: !this.state.showPaymentMethod
    });
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
        onClick={this.toggleSection}
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
      if (this.props.pickedDate.date) {
        return `取货地点：${this.props.pickedDate.shop_name} 取货日期：${
          this.props.pickedDate.date
        }`;
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
              value="ALIPAY"
              onChange={this.handlePaymentMethodChange}
            />
            <span className="payment-section__check-mark-wrapper">
              <img
                className="payment-section__body-img"
                src="images/alipay.png"
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
                src="images/wechat.png"
                alt=""
              />
            </span>
          </label>
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
  render() {
    return (
      <React.Fragment>
        <Head title="天府川菜馆" pageName="confirm" />
        <div className="component-confirm">
          {this.renderSectionHeader("选择取货的店面和时间", "showShopList")}
          {this.renderShopList()}
          {this.renderSectionHeader("选择付款方式", "showPaymentMethod")}
          {this.renderPaymentMethod()}
          <div className="component-confirm__button-group">
            <button
              className="component-confirm__save-button"
              onClick={this.props.saveOrCreateOrder}
            >
              保存订单
            </button>
            <button
              onClick={this.submitPayment}
              className="component-confirm__payment-button"
            >
              确定付款
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ shops, pickedDate, paymentMethod }) => {
  return { shops, pickedDate, paymentMethod };
};

export default connect(
  mapStateToProps,
  { getShops, setPaymentMethod, makePayment, saveOrCreateOrder, fetchUser }
)(Confirm);
