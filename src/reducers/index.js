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
  orders: ordersReducer
});
