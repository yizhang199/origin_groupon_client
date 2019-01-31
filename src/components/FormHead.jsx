import React from "react";
import { Link } from "react-router-dom";

import { history } from "../history";
import "../css/FormHead.css";

const FormHead = () => {
  console.log(history.location.pathname);

  return (
    <div className="component-form-head">
      <Link
        className={`component-from-head__nav left${
          history.location.pathname === "/register" ? " active" : ""
        }`}
        to="/register"
      >
        注册
      </Link>
      <Link
        className={`component-from-head__nav right${
          history.location.pathname === "/login" ? " active" : ""
        }`}
        to="/login"
      >
        登录
      </Link>
    </div>
  );
};

export default FormHead;
