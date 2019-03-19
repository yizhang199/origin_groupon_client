import React from "react";
import { connect } from "react-redux";
import { setPaymentMethod } from "../../_actions";
import { baseUrl } from "../../_apis";

const PaymentMethodSection = ({ setPaymentMethod, toggleSection }) => {
  const paymentMethods = [
    { value: "Paypal", image: "/images/paypal.png" },
    { value: "ALIPAY", image: "/images/alipay.png" },
    { value: "WECHAT", image: "/images/wechat.png" },
    { value: "CASH", image: "/images/cash.png" }
  ];
  const handlePaymentMethodChange = e => {
    toggleSection("showPaymentMethodSection");
    setPaymentMethod(e.target.value);
  };
  const renderInput = ({ value, image }) => {
    return (
      <label
        key={`paymentMethod${value}`}
        className="payment-section__radio-label"
      >
        <input
          type="radio"
          name="payment_method"
          value={value}
          onChange={handlePaymentMethodChange}
        />
        <span className="payment-section__check-mark-wrapper">
          <img
            className="payment-section__body-img"
            src={`${baseUrl}${image}`}
            alt=""
          />
        </span>
      </label>
    );
  };
  return (
    <div className="payment-section">
      <div className="payment-section__body">
        {paymentMethods.map(element => {
          return renderInput(element);
        })}
      </div>
    </div>
  );
};

export default connect(
  null,
  { setPaymentMethod }
)(PaymentMethodSection);
