import axios from "axios";

import types from "./actionTypes";

import redpay from "../apis/payment";
import { getTotalPrice, getTotal } from "../helpers";

export const create = () => {
  return async function(dispatch, getState) {
    const { paymentMethod, shoppingCartList } = getState();

    const today = new Date();
    const timestamps = Math.floor(today / 1000);
    const mchOrderNo = `${today.getFullYear()}${today.getDate()}${today.getMonth()}${Math.round(
      Math.random() * 1000
    )}`;

    const response = await redpay.post(`create`, {
      version: "1.0",
      mchNo: "77902",
      storeNo: "77911",
      mchOrderNo: mchOrderNo,
      channel: paymentMethod,
      payWay: "BUYER_SCAN_TRX_QRCODE",
      currency: "AUD",
      amount: getTotalPrice(shoppingCartList),
      notifyUrl: "http://kidsnparty.com.au/table4/public/api/payment",
      returnUrl: "http://localhost:3000/complete",
      item: "Clothes",
      quantity: getTotal(shoppingCartList),
      timestamp: timestamps,
      params: '{"buyerId":285502587945850268}'
    });

    window.location = response.data.approvel_url
      ? response.data.approvel_url
      : "/confirm";
    dispatch({ type: "abc" });
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
    dispatch({
      type: types.setPaymentInformation,
      payload: response.data.transactions ? response.data.transactions : []
    });
  };
};
export default { create, query };
