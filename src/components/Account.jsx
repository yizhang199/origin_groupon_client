import React from "react";
import { connect } from "react-redux";

import AccountInformation from "./AccountInformation";
import Orders from "./Orders";

import { fetchUser } from "../actions";

class Account extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="compnent-account">
        <AccountInformation />
        <Orders />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(Account);
