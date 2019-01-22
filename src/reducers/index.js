import { combineReducers } from "redux";
import { actionTypes } from "../actions";
import { reducer as formReducer } from "redux-form";

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

const shoppingCartListReducer = (shoppingCartList = [], action) => {
  if (action.type === actionTypes.addToShoppingCartList) {
  } else if (action.type === actionTypes.decreaseFromShoppingCartList) {
  }

  return shoppingCartList;
};

export default combineReducers({
  products: productsReducer,
  language_id: languageIdReducer,
  form: formReducer,
  shoppingCartList: shoppingCartListReducer
});
