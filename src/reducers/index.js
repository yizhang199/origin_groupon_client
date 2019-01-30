import { combineReducers } from "redux";
import { actionTypes } from "../actions";
import { reducer as formReducer } from "redux-form";
import shoppingCartListReducer from "./shoppingCartListReducer";

const productsReducer = (products = [], action) => {
  if (action.type === actionTypes.getProducts) {
    return action.payload.data;
  }
  return products;
};

const languageIdReducer = (language_id = 2, action) => {
  if (action.type === actionTypes.switchLanguage) {
    return action.payload;
  }
  return language_id;
};

const selectedShopReducer = (selectedShop = {}, action) => {
  if (action.type === actionTypes.selectedShop) {
    return action.payload;
  }

  return selectedShop;
};

const pickedDateReducer = (pickedDate = {}, action) => {
  if (action.type === actionTypes.pickedDate) {
    return action.payload;
  }

  return pickedDate;
};

const shopsReducer = (shops = [], action) => {
  if (action.type === actionTypes.getShops) {
    return action.payload;
  }
  return shops;
};

export default combineReducers({
  products: productsReducer,
  language_id: languageIdReducer,
  form: formReducer,
  shoppingCartList: shoppingCartListReducer,
  selectedShop: selectedShopReducer,
  pickedDate: pickedDateReducer,
  shops: shopsReducer
});
