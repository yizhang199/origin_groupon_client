import React from "react";
import { Link } from "react-router-dom";

import "../css/FormHead.css";

const FormHead = props => {
  return (
    <div className="component-form-head">
      <Link
        className={`component-from-head__nav left${
          props.pathname === "register" ? " active" : ""
        }`}
        to="/register"
      >
        注册
      </Link>
      <Link
        className={`component-from-head__nav right${
          props.pathname === "login" ? " active" : ""
        }`}
        to="/login"
      >
        登录
      </Link>
    </div>
  );
};

export default FormHead;
