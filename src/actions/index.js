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

export const addToShoppingCartList = orderItem => {
  return {
    type: types.addToShoppingCartList,
    payload: orderItem
  };
};

export const decreaseFromShoppingCartList = orderItem => {
  return {
    type: types.decreaseFromShoppingCartList,
    payload: orderItem
  };
};
export const actionTypes = types;
