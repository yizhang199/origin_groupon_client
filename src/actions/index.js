import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";

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
export const actionTypes = types;
