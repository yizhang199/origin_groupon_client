import { actionTypes } from "../actions";
import _ from "lodash";

const shoppingCartListReducer = (shoppingCartList = [], action) => {
  let item = action.payload;
  let resultArr = [];
  if (action.type === actionTypes.addToShoppingCartList) {
    let flag = false;
    resultArr = shoppingCartList.map(orderItem => {
      if (_.isEqual(orderItem.item, item)) {
        flag = true;
        return { ...orderItem, quantity: orderItem.quantity + 1 };
      } else {
        return orderItem;
      }
    });

    if (!flag) {
      resultArr = [...shoppingCartList, { item: item, quantity: 1 }];
    }
    return resultArr;
  } else if (action.type === actionTypes.decreaseFromShoppingCartList) {
    const arr = shoppingCartList.map(orderItem => {
      if (_.isEqual(orderItem.item, item)) {
        return { ...orderItem, quantity: orderItem.quantity - 1 };
      } else {
        return orderItem;
      }
    });

    resultArr = arr.filter(ele => ele.quantity > 0);
    return resultArr;
  }

  return shoppingCartList;
};

export default shoppingCartListReducer;
