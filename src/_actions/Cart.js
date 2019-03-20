import types from "./actionTypes";

import { kidsnParty } from "../_apis";
import { history } from "../history";

const add = product => {
  return {
    type: types.addToShoppingCartList,
    payload: product
  };
};
export const decreaseByProduct = product => {
  return {
    type: types.decreaseFromShoppingCartList,
    payload: product
  };
};

export const increaseByOrderItem = orderItem => {
  return {
    type: types.increaseOrderItem,
    payload: orderItem
  };
};

export const decreaseByOrderItem = orderItem => {
  return {
    type: types.decreaseOrderItem,
    payload: orderItem
  };
};

export const renderNew = order => {
  return async function(dispatch, getState) {
    const { language_id } = getState();
    const paymentMethod = order.payment_method;
    const selectedShop = {
      location_id: order.store_id,
      name: order.store_name
    };
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
      payload: {
        newShoppingCartList,
        paymentMethod,
        selectedShop,
        date: order.picked_date,
        order_id: order.order_id
      }
    });

    history.push(`${process.env.PUBLIC_URL}/`);
  };
};

export default {
  add,
  renderNew,
  increaseByOrderItem,
  decreaseByOrderItem,
  decreaseByProduct
};
