import types from "./actionTypes";

import { Payment as redpay, kidsnParty } from "../_apis";
import {
  getTotalPrice,
  getTotal,
  calculateTotalPrice,
  makeOrderItemOption,
  makeHeader,
  makeOrderInfo,
  makeInvoice_no
} from "../_helpers";
import { history } from "../history";
const create = () => {
  return async function(dispatch, getState) {
    const {
      user,
      pickedDate,
      selectedShop,
      paymentMethod,
      customerComments
    } = getState();
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
      total: orderInfo.total,
      order_items: orderInfo.items,
      customerComments
    };
    const response = await kidsnParty.post("/payment", requestBody, {
      headers
    });

    dispatch({ type: types.refreshShoppingCart });

    if (response.data.status === "success") {
      window.location.href = response.data.approvel_url;
    } else {
      history.push(`${process.env.PUBLIC_URL}/`);
    }
  };
};

const query = (channel, payment_id) => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`payment`, {
      params: {
        channel,
        payment_id
      }
    });
    console.log(response);
    const fakeData = {
      error_code: null,
      date_time: new Date(),
      status: "Complete",
      bill_amount: "200.00",
      paid_amount: "200.00",
      transaction_id: "abc1122334455676"
    };
    dispatch({
      type: types.setPaymentInformation,
      payload: response.data.payment_information
        ? response.data.payment_information
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
