import React from "react";

import { makeDate } from "../helpers";

import "../css/OrderCard.css";
const OrderCard = props => {
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
      <div className="component-order-card__footer">
        <button className="component-order-card__footer__button-remove">
          删除订单
        </button>
        <button className="component-order-card__footer__button-continue">
          继续点单
        </button>
      </div>
    </div>
  );
};

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

export default OrderCard;
