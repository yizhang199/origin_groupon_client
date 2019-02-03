import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";
import redpay from "../apis/payment";
import { history } from "../history";
import { calculateTotalPrice, makeOrderItemOption } from "../helpers";

export const getProducts = language_id => {
  return async function(dispatch, getState) {
    const response = await kidsnParty.get(`/products/${language_id}`);

    dispatch({ type: types.getProducts, payload: response });
  };
};

export const switchLanguage = language_id => {
  language_id = language_id === 1 ? 2 : 1;
  return {
    type: types.switchLanguage,
    payload: language_id
  };
};

export const addToShoppingCartList = product => {
  return {
    type: types.addToShoppingCartList,
    payload: product
  };
};

export const decreaseFromShoppingCartList = product => {
  return {
    type: types.decreaseFromShoppingCartList,
    payload: product
  };
};

export const increaseOrderItem = orderItem => {
  return {
    type: types.increaseOrderItem,
    payload: orderItem
  };
};

export const decreaseOrderItem = orderItem => {
  return {
    type: types.decreaseOrderItem,
    payload: orderItem
  };
};

export const confirmOrder = () => {
  return async function(dispatch) {
    const response = await kidsnParty.post(`/orders`);

    dispatch({ type: types.confirmOrder, payload: response.data });
  };
};

export const selectedShop = shop => {
  return {
    type: types.selectedShop,
    payload: shop
  };
};

export const pickedDate = date => {
  return {
    type: types.pickedDate,
    payload: date
  };
};

export const getShops = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/locations`);

    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};

export const login = () => {
  return async function(dispatch, getState) {
    const { values } = getState().form.loginForm;

    const requestBody = { email: values.email, password: values.password };
    const response = await kidsnParty.post(`/user/login`, requestBody);
    if (response.data.success) {
      dispatch({ type: types.login, payload: response.data.data });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      history.push("/");
    } else {
      alert("email or password incorrect");
    }
  };
};

export const register = () => {
  return async function(dispatch, getState) {
    const { values } = getState().form.registerForm;

    const response = await kidsnParty.post(`/user/register`, values);
    console.log(response);
  };
};

export const setPaymentMethod = value => {
  return {
    type: types.setPaymentMethod,
    payload: value
  };
};
export const makePayment = () => {
  return async function(dispatch, getState) {
    const { paymentMethod } = getState();

    var win = window.open("_blank");
    const today = new Date();
    const timestamps = Math.floor(today / 1000);
    const mchOrderNo = `123456789999666${Math.round(Math.random() * 1000)}`;
    const response = await redpay.post(`create`, {
      version: "1.0",
      mchNo: "77902",
      storeNo: "77911",
      mchOrderNo: mchOrderNo,
      channel: paymentMethod,
      payWay: "BUYER_SCAN_TRX_QRCODE",
      currency: "AUD",
      amount: 123,
      notifyUrl: "http://kidsnparty.com.au/table4/public/api/payment",
      returnUrl: "https://wap.redpayments.com.au/pay/success",
      item: "Clothes",
      quantity: 1,
      timestamp: timestamps,
      params: '{"buyerId":285502587945850268}'
    });

    win.location = response.data.data.qrCode;
    dispatch({ type: "abc" });
    // .then(res => {
    //   // this.setState({ order_no: res.data.data.mchOrderNo });
    //   this.setState({ order_no: mchOrderNo });
    //   console.log(res.data);
    //
    // });
  };
};

export const fetchUser = () => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      type: types.login,
      payload: user
    };
  } else {
    history.push("/login");
    return { type: "abc" };
  }
};

export const fetchOrders = () => {
  return async function(dispatch, getState) {
    const { id } = getState().user;

    const response = await kidsnParty.get(`/orders`);
    dispatch({ type: types.setOrders, payload: response.data.orders });
  };
};
export const saveOrCreateOrder = method => {
  return async function(dispatch, getState) {
    const { user, pickedDate, paymentMethod } = getState();
    const { location_id } = pickedDate;
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
    const requestBody = {
      // TODO: generate invoice_no dynamicly
      invoice_no: 123,
      store_id: location_id,
      customer_id: user.id,
      payment_method: paymentMethod,
      fax: pickedDate.date,
      order_status_id: method,
      total: orderInfo.total,
      order_items: orderInfo.items
    };
    const response = await kidsnParty.post("/orders", requestBody);
    console.log(response);
    dispatch({ type: types.refreshShoppingCart });
    history.push("/");
  };
};

export const renderNewShoppingCart = order => {
  return async function(dispatch, getState) {
    let newShoppingCartList = [];
    setPaymentMethod(order.paymentMethod);

    dispatch({
      type: types.renderNewShoppingCart,
      payload: newShoppingCartList
    });
  };
};

export const actionTypes = types;
