import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";
import { calculateTotalPrice, makeOrderItemOption } from "../helpers";
export const create = method => {
  return async function(dispatch, getState) {
    const { user, pickedDate, paymentMethod } = getState();
    const { location_id } = pickedDate;
    const { shoppingCartList } = getState();
    const makeOrderInfo = () => {
      let total = 0;
      let items = [];

      shoppingCartList.map(orderItem => {
        const options = orderItem.item.choices
          ? makeOrderItemOption(orderItem.item.choices)
          : [];
        const sum = calculateTotalPrice(orderItem);
        total += sum;
        items = [
          ...items,
          {
            product_id: orderItem.item.product_id,
            price: sum / orderItem.quantity,
            quantity: orderItem.quantity,
            total: sum,
            options
          }
        ];
      });

      return { total, items };
    };

    const orderInfo = makeOrderInfo();
    const requestBody = {
      // TODO: generate invoice_no dynamicly
      invoice_no: 123,
      store_id: location_id,
      customer_id: user.user_id,
      payment_method: paymentMethod,
      fax: pickedDate.date,
      order_status_id: method,
      total: orderInfo.total,
      order_items: orderInfo.items
    };
    const response = await kidsnParty.post("/orders", requestBody);
    dispatch({ type: types.refreshShoppingCart });
    history.push("/");
  };
};

export default {
  create
};
