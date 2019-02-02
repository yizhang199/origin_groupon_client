import React from "react";
import { connect } from "react-redux";

import { fetchOrders } from "../actions";

import OrderCard from "./OrderCard";

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div className="component-orders">
        {this.props.orders.map(order => {
          return <OrderCard order={order} key={order.invoice_no} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders };
};

export default connect(
  mapStateToProps,
  { fetchOrders }
)(Orders);
