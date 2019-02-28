import types from "./actionTypes";

import { kidsnParty, Payment } from "../apis";
import Auth from "./Auth";
import Order from "./Order";
import Product from "./Product";

import { history } from "../history";
export const actionTypes = types;
export const initialApp = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get("/initial", {
      params: {
        language_id: localStorage.getItem("aupos_language_id")
          ? localStorage.getItem("aupos_language_id")
          : null
      }
    });
    dispatch({ type: types.initialApp, payload: response.data });
  };
};
export const switchLanguage = language_id => {
  language_id = parseInt(language_id);
  language_id = language_id === 1 ? 2 : 1;

  return {
    type: types.switchLanguage,
    payload: language_id
  };
};
export const getProducts = Product.index;

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

export const login = Auth.login;
export const register = Auth.register;
export const fetchUser = Auth.show;

export const setPaymentMethod = value => {
  return {
    type: types.setPaymentMethod,
    payload: value
  };
};
export const makePayment = Payment.create;
// order actions
export const fetchOrders = Order.index;
export const saveOrCreateOrder = Order.create;
export const deleteOrder = Order.deleteOrder;

export const queryOrder = Payment.query;

export const renderNewShoppingCart = order => {
  return async function(dispatch, getState) {
    const date = order.picked_date;
    const location_id = order.store_id;
    const shop_name = order.store_name;
    const { language_id } = getState();
    // 1. set up simple value state attributes
    // 1-1. pickedDate
    pickedDate({ date, location_id, shop_name });
    // 1-3. paymentMethod
    setPaymentMethod(order.paymentMethod);

    // 2. set up complicate object data
    // 2-1. restore shoppingCartList
    const reponse = await kidsnParty.post("/convert", {
      items: order.order_items,
      language_id,
      order_id: order.order_id
    });

    const newShoppingCartList = reponse.data.shoppingCartList;

    dispatch({
      type: types.renderNewShoppingCart,
      payload: newShoppingCartList
    });

    history.push(`${process.env.PUBLIC_URL}/`);
  };
};
