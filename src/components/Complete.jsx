import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import { queryOrder } from "../actions";
class Complete extends React.Component {
  componentDidMount() {
    const paymentId = queryString.parse(this.props.location.search).paymentId;
    this.props.queryOrder(paymentId);
  }

  renderPaymentInformation = () => {
    return this.props.paymentInformation.map((element, index) => {
      return (
        <div key={`paymentInformation${index}`}>
          Paid Amount: ${element.amount.total} <br /> Payee:{" "}
          {element.payee.email}
        </div>
      );
    });
  };

  render() {
    if (this.props.paymentInformation.length === 0) {
      return <div>loading...</div>;
    }
    return (
      <div className="component-complete">
        {this.renderPaymentInformation()}
      </div>
    );
  }
}

const mapStateToProps = ({ paymentInformation }) => {
  return { paymentInformation };
};

export default connect(
  mapStateToProps,
  { queryOrder }
)(Complete);
