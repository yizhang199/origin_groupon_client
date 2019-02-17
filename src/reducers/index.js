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
    localStorage.setItem("aupos_language_id", action.payload);
    console.log(localStorage.getItem("aupos_language_id"));
    return action.payload;
  } else if (
    action.type === actionTypes.initialApp &&
    !localStorage.getItem("aupos_language_id")
  ) {
    localStorage.setItem(
      "aupos_language_id",
      action.payload.custom_setting.default_language_id
    );
    return action.payload.custom_setting.default_language_id;
  }

  return localStorage.getItem("aupos_language_id")
    ? localStorage.getItem("aupos_language_id")
    : language_id;
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
const userReducer = (user = {}, action) => {
  if (action.type === actionTypes.login) {
    return action.payload;
  }
  return user;
};
const paymentMethodReducer = (paymentMethod = "", action) => {
  if (action.type === actionTypes.setPaymentMethod) {
    return action.payload;
  }
  return paymentMethod;
};
const ordersReducer = (orders = [], action) => {
  if (action.type === actionTypes.setOrders) {
    return action.payload;
  }
  return orders;
};
const customSettingReducer = (customSetting = {}, action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.custom_setting;
  }
  return customSetting;
};
const labelsReducer = (labels = {}, action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.layout_text;
  }
  return labels;
};
export default combineReducers({
  products: productsReducer,
  language_id: languageIdReducer,
  form: formReducer,
  shoppingCartList: shoppingCartListReducer,
  selectedShop: selectedShopReducer,
  pickedDate: pickedDateReducer,
  shops: shopsReducer,
  user: userReducer,
  paymentMethod: paymentMethodReducer,
  orders: ordersReducer,
  customSetting: customSettingReducer,
  labels: labelsReducer
});
