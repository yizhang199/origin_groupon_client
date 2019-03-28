import React from "react";
import { connect } from "react-redux";

import { history } from "../../history";

const AccountInformation = props => {
  if (!props.labels.account_greeting) {
    return <div>loading...</div>;
  }

  return (
    <div className="component-account-information">
      <div className="component-account-information__title">
        {props.labels.account_greeting}, {props.user.username}
      </div>

      <div className="component-account-information__footer">
        {parseInt(props.user.user_group_id) === 3 ? (
          <button
            className="nav-to-admin"
            onClick={() => {
              window.location.href = `http://guoli.com.au/admin`;
            }}
          >{`前往控制台`}</button>
        ) : null}
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("guoli_groupon_user");
            history.push(`${process.env.PUBLIC_URL}/`);
          }}
        >
          {props.labels.sign_out}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, labels }) => {
  return { user, labels };
};

export default connect(mapStateToProps)(AccountInformation);
