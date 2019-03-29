import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../../history";

// import "./sass/FormHead.css";

const FormHead = ({ labels }) => {
  const getClass = path => {
    const numberOfRootPath = process.env.PUBLIC_URL.length;
    const historyPath = history.location.pathname.substr(numberOfRootPath);
    // console.log({ string: history.location.pathname, substr: historyPath });

    const positionOfSecondSlash = historyPath.indexOf("/", 2);
    const compareString =
      positionOfSecondSlash === -1
        ? historyPath
        : historyPath.substring(0, positionOfSecondSlash);
    if (path === compareString) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <div className="component-form-head">
      <Link
        className={`component-from-head__nav left ${getClass("/register")}`}
        to={`${process.env.PUBLIC_URL}/register`}
      >
        {labels.auth_form_head_signup}
      </Link>
      <Link
        className={`component-from-head__nav right ${getClass("/login")}`}
        to={`${process.env.PUBLIC_URL}/login`}
      >
        {labels.auth_form_head_signin}
      </Link>
    </div>
  );
};

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(mapStateToProps)(FormHead);
