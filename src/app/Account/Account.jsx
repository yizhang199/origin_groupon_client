import React from "react";
import { connect } from "react-redux";

import AccountInformation from "./AccountInformation";
import Orders from "./Orders";
import { Head } from "../shared";

import { fetchUser } from "../../_actions";

class Account extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    if (!this.props.labels.app_head_title) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="account" />
        <div className="compnent-account">
          <AccountInformation />
          <Orders />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(Account);
