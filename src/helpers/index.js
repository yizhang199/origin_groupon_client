export const calculateTotalPrice = orderItem => {
  let sum = 0;

  let price = parseFloat(orderItem.item.price);
  if (orderItem.item.choices) {
    orderItem.item.choices.map(choice => {
      if (Array.isArray(choice.productOptionValue)) {
        choice.productOptionValue.map(value => {
          price += parseFloat(value.price);
        });
      } else {
        price += parseFloat(choice.productOptionValue.price);
      }
    });
  }

  sum += price * orderItem.quantity;

  return sum;
};

export const makeOrderItemOption = choices => {
  let options = [];

  choices.map(choice => {
    const product_option_id = choice.productOption;

    if (Array.isArray(choice.productOptionValue)) {
      choice.productOptionValue.map(value => {
        const { product_option_value_id } = value;
        const newOption = { product_option_id, product_option_value_id };
        options = [...options, newOption];
      });
    } else {
      options = [
        ...options,
        {
          product_option_id,
          product_option_value_id:
            choice.productOptionValue.product_option_value_id
        }
      ];
    }
  });

  return options;
};

/**
 * calculate total quantity of shopping cart list
 * @param {Array} shoppingCartList
 * @returns {Integer} total quantity of shopping cart list
 */
export const getTotal = shoppingCartList => {
  let count = 0;
  shoppingCartList.map(orderItem => {
    count += orderItem.quantity;
  });

  return count;
};

/**
 * calculate total price of shoppingCartList
 * @param {Array} shoppingCartList
 * @returns {decimal} total price/cost of ordered items
 */
export const getTotalPrice = shoppingCartList => {
  let sum = 0;
  shoppingCartList.map(orderItem => {
    let price = parseFloat(orderItem.item.price);
    if (orderItem.item.choices) {
      orderItem.item.choices.map(choice => {
        if (Array.isArray(choice.productOptionValue)) {
          choice.productOptionValue.map(value => {
            price += parseFloat(value.price);
          });
        } else {
          price += parseFloat(choice.productOptionValue.price);
        }
      });
    }

    sum += price * orderItem.quantity;
  });

  return sum.toFixed(2);
};

export const makePrice = value => {
  if (value == 0) {
    return `free`;
  } else {
    return `$${value}`;
  }
};

/**
 * format open date
 * @param {String} date
 * @returns {String} formatted Open Date
 */
export const makeDate = date => {
  const dt = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const cusYear = dt.getFullYear();
  const cusMonth = months[dt.getMonth()];
  const dtDate = dt.getDate();
  const cusDate = dtDate > 9 ? dtDate : `0${dtDate}`;
  if (!cusMonth || !cusDate || !cusYear) {
    return undefined;
  }
  return `${cusMonth} ${cusDate}, ${cusYear}`;
};

export const makeHeader = () => {
  let headers = {};
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const auth_token = `Bearer ${user.api_token}`;
    headers = { Authorization: auth_token };
  }

  return headers;
};

export const makeOrderInfo = shoppingCartList => {
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

export const makeInvoice_no = () => {
  const today = new Date();
  return `${today.getFullYear()}${today.getDate()}${today.getMonth()}${Math.round(
    Math.random() * 1000
  )}`;
};
