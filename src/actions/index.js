import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";

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
      history.push("/payment");
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
export const actionTypes = types;
