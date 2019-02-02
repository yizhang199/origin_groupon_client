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
  return `${cusMonth} ${cusDate}, ${cusYear}`;
};
