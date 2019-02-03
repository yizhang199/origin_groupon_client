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
        {this.props.orders.map((order, index) => {
          if (order.status_id !== 3) {
            return <OrderCard order={order} key={`customerOrder${index}`} />;
          }
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
