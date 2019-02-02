import React from "react";
import { connect } from "react-redux";

import { history } from "../history";

const AccountInformation = props => {
  return (
    <div className="component-account-information">
      <p>{props.user.name}</p>
      <p>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            history.push("/");
          }}
        >
          登出
        </button>
      </p>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(AccountInformation);
