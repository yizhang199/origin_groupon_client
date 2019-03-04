import React from "react";
import { connect } from "react-redux";

import { renderNewShoppingCart, deleteOrder } from "../actions";
import { makeDate } from "../helpers";

import "../css/OrderCard.css";

/**
 * main function to render JSX
 * @param {React.Props} props
 * @returns {JSX} order card component
 */
const OrderCard = props => {
  /**
   * render list of order items for certain order
   * @param {Array} list
   * @returns {JSX}
   */
  const renderOrderList = list => {
    return (
      <div className="component-order-card__body__list">
        {list.map((orderItem, index) => {
          return (
            <span
              key={`orderItem${index}`}
              className="component-order-card__body__list-item"
            >
              <span>{orderItem.name}</span> x <span>{orderItem.quantity},</span>
            </span>
          );
        })}
      </div>
    );
  };

  /**
   * render JSX for button group or text information depending order status
   * @param {Object<Order>} order
   * @returns {JSX}
   */
  const renderOrderCardFooter = order => {
    if (parseInt(order.status_id) === 1) {
      return (
        <div className="component-order-card__footer">
          <button
            className="component-order-card__footer__button-remove"
            onClick={deleteOrder}
          >
            删除订单
          </button>
          <button
            className="component-order-card__footer__button-continue"
            onClick={continueOrder}
          >
            继续点单
          </button>
        </div>
      );
    } else {
      return (
        <div className="component-order-card__footer">
          <div className="component-order-card__footer__intro">
            该订单已经生成，若需修改请联系客服。
          </div>
        </div>
      );
    }
  };
  /**
   * call action delete order by calling api
   * @param {void}
   * @returns {void}
   */

  const deleteOrder = () => {
    props.deleteOrder(props.order);
  };
  /**
   * call aciont function to change state in redux store
   * @param {void}
   * @returns {Void} call action function
   */
  const continueOrder = () => {
    props.renderNewShoppingCart(props.order);
  };
  const order = props.order;
  return (
    <div className="component-order-card">
      <div className="component-order-card__header">
        <span className="component-order-card__header__left">
          <span className="component-order-card__header__invoice-no">
            <span className="component-order-card__header__invoice-no__title">
              订单号
            </span>
            <span className="component-order-card__header__invoice-no__value">
              {order.invoice_no}
            </span>
          </span>
          <span className="component-order-card__header__added-date">
            <span className="component-order-card__header__added-date__title">
              创建日期
            </span>
            <span className="component-order-card__header__added-date__value">
              {makeDate(order.create_date)}
            </span>
          </span>
        </span>
        <span className="component-order-card__header__right">
          <span className="component-order-card__header__picked-shop">
            <span className="component-order-card__header__picked-shop__title">
              取货地点
            </span>
            <span className="component-order-card__header__picked-shop__value">
              {order.store_name}
            </span>
          </span>
          <span className="component-order-card__header__picked-date">
            <span className="component-order-card__header__picked-date__title">
              取货时间
            </span>
            <span className="component-order-card__header__picked-date__value">
              {makeDate(order.picked_date)}
            </span>
          </span>
        </span>
      </div>
      <div className="component-order-card__body">
        {renderOrderList(order.order_items)}
      </div>
      {renderOrderCardFooter(order)}
    </div>
  );
};

export default connect(
  null,
  { renderNewShoppingCart, deleteOrder }
)(OrderCard);
