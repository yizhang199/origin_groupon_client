import React from "react";
import { connect } from "react-redux";

import AccountInformation from "./AccountInformation";
import Orders from "./Orders";
import Head from "./Head";

import { fetchUser } from "../actions";

class Account extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <React.Fragment>
        <Head title="天府川菜馆" pageName="account" />
        <div className="compnent-account">
          <AccountInformation />
          <Orders />
        </div>
      </React.Fragment>
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
