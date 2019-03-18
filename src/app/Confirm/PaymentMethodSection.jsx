import React from "react";

const PaymentMethodSection = () => {
  const renderInput = () => {
    <label className="payment-section__radio-label">
      <input
        type="radio"
        name="payment_method"
        value="Paypal"
        onChange={this.handlePaymentMethodChange}
      />
      <span className="payment-section__check-mark-wrapper">
        <img
          className="payment-section__body-img"
          src={`${baseUrl}/images/paypal.png`}
          alt=""
        />
      </span>
    </label>;
  };
  return <div className="payment-section" />;
};

export default PaymentMethodSection;

/**
 * render payment method details
 * @param {Void}
 * @returns {JSX}
 */
renderPaymentMethod = () => {
  if (this.state.showPaymentMethod) {
    return (
      <div className="payment-section__body">
        <label className="payment-section__radio-label">
          <input
            type="radio"
            name="payment_method"
            value="ALIPAY"
            onChange={this.handlePaymentMethodChange}
          />
          <span className="payment-section__check-mark-wrapper">
            <img
              className="payment-section__body-img"
              src={`${baseUrl}/images/alipay.png`}
              alt=""
            />
          </span>
        </label>
        <label className="payment-section__radio-label">
          <input
            type="radio"
            name="payment_method"
            value="WECHAT"
            onChange={this.handlePaymentMethodChange}
          />
          <span className="payment-section__check-mark-wrapper">
            <img
              className="payment-section__body-img"
              src={`${baseUrl}/images/wechat.png`}
              alt=""
            />
          </span>
        </label>
        {this.props.userAllowCash ? (
          <label className="payment-section__radio-label">
            <input
              type="radio"
              name="payment_method"
              value="CASH"
              onChange={this.handlePaymentMethodChange}
            />
            <span className="payment-section__check-mark-wrapper">
              <img
                className="payment-section__body-img"
                src={`${baseUrl}/images/cash.png`}
                alt="Cash"
              />
            </span>
          </label>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};
