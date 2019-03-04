import types from "./actionTypes";

import { Payment as redpay, kidsnParty } from "../apis";
import {
  getTotalPrice,
  getTotal,
  calculateTotalPrice,
  makeOrderItemOption,
  makeHeader
} from "../helpers";

export const create = () => {
  return async function(dispatch, getState) {
    const { user, pickedDate, selectedShop, paymentMethod } = getState();
    const { location_id } = selectedShop;
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
      fax: pickedDate,
      order_status_id: 1,
      total: orderInfo.total,
      order_items: orderInfo.items
    };
    const response = await kidsnParty.post("/orders", requestBody, { headers });

    const timestamps = Math.floor(today / 1000);
    const mchOrderNo = `${today.getFullYear()}${today.getDate()}${today.getMonth()}${Math.round(
      Math.random() * 1000
    )}`;

    const paymentResponse = await redpay.post(`create`, {
      version: "1.0",
      mchNo: "77902",
      storeNo: "77911",
      mchOrderNo: mchOrderNo,
      channel: paymentMethod,
      payWay: "BUYER_SCAN_TRX_QRCODE",
      currency: "AUD",
      amount: getTotalPrice(shoppingCartList),
      notifyUrl: "http://kidsnparty.com.au/roben_api/public/api/payment",
      returnUrl: "http://kidsnparty.com.au/groupon/complete",
      item: "Clothes",
      quantity: getTotal(shoppingCartList),
      timestamp: timestamps,
      params: '{"buyerId":285502587945850268}'
    });

    window.location = paymentResponse.data.approvel_url
      ? paymentResponse.data.approvel_url
      : "/confirm";
    dispatch({ type: types.saveOrder, payload: response.data });
  };
};
const query = paymentId => {
  return async function(dispatch) {
    const response = await redpay.get(`${paymentId}`, {
      params: {
        channel: "Paypal"
      }
    });
    console.log(response);
    const fakeData = [
      { amount: { total: 125 }, payee: { email: `fakeEmail.com` } }
    ];
    dispatch({
      type: types.setPaymentInformation,
      payload: response.data.transactions
        ? response.data.transactions
        : fakeData
    });
  };
};
export const setPaymentMethod = value => {
  return {
    type: types.setPaymentMethod,
    payload: value
  };
};
export default { create, query, setPaymentMethod };
