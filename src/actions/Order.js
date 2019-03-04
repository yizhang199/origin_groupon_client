import types from "./actionTypes";

import { kidsnParty } from "../apis";
import { history } from "../history";
import { makeOrderInfo, makeHeader, makeInvoice_no } from "../helpers";

export const index = () => {
  return async function(dispatch) {
    const headers = makeHeader();
    const response = await kidsnParty.get(`/orders`, { headers });
    dispatch({ type: types.setOrders, payload: response.data.orders });
  };
};
export const create = method => {
  return async function(dispatch, getState) {
    const { user, pickedDate, selectedShop, paymentMethod } = getState();
    const { location_id } = selectedShop;
    const headers = makeHeader();
    const { shoppingCartList } = getState();

    const orderInfo = makeOrderInfo(shoppingCartList);
    const invoice_no = makeInvoice_no();

    const requestBody = {
      invoice_no: invoice_no,
      store_id: location_id,
      customer_id: user.user_id,
      payment_method: paymentMethod,
      fax: pickedDate,
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
