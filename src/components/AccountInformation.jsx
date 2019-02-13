import React from "react";
import { connect } from "react-redux";

import { history } from "../history";

import "../css/AccountInformation.css";

const AccountInformation = props => {
  console.log(props);

  return (
    <div className="component-account-information">
      <div className="component-account-information__title">
        欢迎回来， {props.user.username}
      </div>

      <div className="component-account-information__footer">
        <button
          className="component-account-information__footer__button-logout"
          onClick={() => {
            localStorage.removeItem("user");
            history.push("/");
          }}
        >
          登出
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(AccountInformation);
