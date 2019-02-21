import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";
import {
  calculateTotalPrice,
  makeOrderItemOption,
  makeHeader
} from "../helpers";

export const index = () => {
  return async function(dispatch) {
    const headers = makeHeader();
    const response = await kidsnParty.get(`/orders`, { headers });
    dispatch({ type: types.setOrders, payload: response.data.orders });
  };
};
export const create = method => {
  return async function(dispatch, getState) {
    const { user, pickedDate, paymentMethod } = getState();
    const { location_id } = pickedDate;
    const headers = makeHeader();
    const { shoppingCartList } = getState();
    const makeOrderInfo = () => {
      let total = 0;
      let items = [];

      shoppingCartList.map(orderItem => {
        const options = orderItem.item.choices
          ? makeOrderItemOption(orderItem.item.choices)
          : [];
        const sum = calculateTotalPrice(orderItem);
        total += sum;
        items = [
          ...items,
          {
            product_id: orderItem.item.product_id,
            price: sum / orderItem.quantity,
            quantity: orderItem.quantity,
            total: sum,
            options
          }
        ];
      });

      return { total, items };
    };

    const orderInfo = makeOrderInfo();
    const today = new Date();
    const invoice_no = `${today.getFullYear()}${today.getDate()}${today.getMonth()}${Math.round(
      Math.random() * 1000
    )}`;
    const requestBody = {
      invoice_no: invoice_no,
      store_id: location_id,
      customer_id: user.user_id,
      payment_method: paymentMethod,
      fax: pickedDate.date,
      order_status_id: method,
      total: orderInfo.total,
      order_items: orderInfo.items
    };
    const response = await kidsnParty.post("/orders", requestBody, { headers });
    dispatch({ type: types.saveOrder, payload: response.data });
    history.push("/");
  };
};
const deleteOrder = order => {
  const headers = makeHeader();
  return async function(dispatch) {
    const response = await kidsnParty.delete(`/order/${order.order_id}`, {
      headers
    });
    dispatch({ type: types.setOrders, payload: response.data });
  };
};

export default {
  create,
  index,
  deleteOrder
};
