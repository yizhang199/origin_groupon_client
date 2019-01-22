import { combineReducers } from "redux";
import { actionTypes } from "../actions";
import { reducer as formReducer } from "redux-form";

const productsReducer = (products = [], action) => {
  if (action.type === actionTypes.getProducts) {
    return action.payload.data;
  }
  return products;
};

export default combineReducers({
  products: productsReducer,
  form: formReducer
});
