import React from "react";
import { Link } from "react-router-dom";

import { history } from "../../history";

// import "./sass/FormHead.css";

const FormHead = () => {
  return (
    <div className="component-form-head">
      <Link
        className={`component-from-head__nav left${
          history.location.pathname === "/register" ? " active" : ""
        }`}
        to={`${process.env.PUBLIC_URL}/register`}
      >
        注册
      </Link>
      <Link
        className={`component-from-head__nav right${
          history.location.pathname === "/login" ? " active" : ""
        }`}
        to={`${process.env.PUBLIC_URL}/login`}
      >
        登录
      </Link>
    </div>
  );
};

export default FormHead;
