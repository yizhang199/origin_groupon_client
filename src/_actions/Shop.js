import types from "./actionTypes";

import { kidsnParty } from "../_apis";

const index = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/locations`);

    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};

export const selectShop = shop => {
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
export const selectDate = date => {
  return {
    type: types.selectDate,
    payload: date
  };
};
export default {
  index,
  pickedDate,
  selectDate,
  selectShop
};
