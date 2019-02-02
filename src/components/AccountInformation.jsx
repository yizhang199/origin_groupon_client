import React from "react";

import { connect } from "react-redux";

const AccountInformation = props => {
  return (
    <div className="component-account-information">
      <p>{props.user.name}</p>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(AccountInformation);
