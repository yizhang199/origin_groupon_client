import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import { queryOrder } from "../../_actions";

import { Head } from "../shared/";

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paymentId: "" };
  }
  componentDidMount() {
    const paymentId = queryString.parse(this.props.location.search).paymentId;
    this.setState({ paymentId });
    this.props.queryOrder(paymentId);
  }

  renderPaymentInformation = () => {
    return this.props.paymentInformation.map((element, index) => {
      return (
        <div
          key={`paymentInformation${index}`}
          className="component-complete__trasition-information"
        >
          <div className="component-complete__trasition-information__row">
            <span className="component-complete__trasition-information__subtitle">
              {this.props.labels.paid_amount}
            </span>
            <span className="component-complete__trasition-information__value">
              ${element.amount.total}
            </span>
          </div>
          <div className="component-complete__trasition-information__row">
            <span className="component-complete__trasition-information__subtitle">
              {this.props.labels.payee}
            </span>
            <span className="component-complete__trasition-information__value">
              {element.payee.email}
            </span>
          </div>
        </div>
      );
    });
  };

  render() {
    if (this.props.paymentInformation.length === 0) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="complete" />
        <div className="component-complete">
          <div className="component-complete__icon">
            <i className="material-icons">done_outline</i>
          </div>
          <div className="component-complete__title">
            {this.props.labels.thanks_for_payment}
          </div>
          {this.renderPaymentInformation()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ paymentInformation, labels }) => {
  return { paymentInformation, labels };
};

export default connect(
  mapStateToProps,
  { queryOrder }
)(Complete);
