import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { fetchCanceledOrder } from "../../_actions";
import { OrderCard } from "../Account";

import { Head } from "../shared/";
class Cancel extends React.Component {
  componentDidMount() {
    const channel = this.props.match.params.channel;
    if (channel === "poli") {
      const paymentId = queryString.parse(this.props.location.search).token;
      this.props.fetchCanceledOrder(channel, paymentId);
    }

    if (channel === "paypal") {
    }

    if (channel === "wechant" || channel === "alipay") {
    }
  }

  renderOrderInformation = () => {};

  renderOrderItemList = () => {};

  render() {
    if (!canceledOrder) {
      return (
        <>
          <Head title={this.props.labels.app_head_title} pageName="cancel" />
          <div className="component-cancel">loading</div>
        </>
      );
    }
    return (
      <>
        <Head title={this.props.labels.app_head_title} pageName="cancel" />
        <div className="component-cancel">
          <OrderCard order={this.props.canceledOrder} />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ canceledOrder }) => {
  return { canceledOrder };
};

export default connect(
  mapStateToProps,
  { fetchCanceledOrder }
)(Cancel);
