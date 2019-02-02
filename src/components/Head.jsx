import React from "react";
import { connect } from "react-redux";

import { switchLanguage } from "../actions";
import { history } from "../history";

import "../css/Head.css";

const Head = props => {
  // const { pathname } = window.location;
  // const isHomePage =
  //   pathname === "/" || pathname === "/products" || pathname === "";
  const isHomePage = props.pageName === "products";
  const clickLanguageButton = () => {
    if (isHomePage) {
      props.switchLanguage(props.language_id);
      alert("暂未开放该功能");
    } else {
      history.push("/");
    }
  };
  const clickAccountButton = () => {
    history.push("/account");
  };
  return (
    <div className="component-head">
      <i className="material-icons" onClick={clickLanguageButton}>
        {isHomePage ? `g_translate` : `home`}
      </i>
      <span>{props.title}</span>
      <i className="material-icons" onClick={clickAccountButton}>
        account_circle
      </i>
    </div>
  );
};

const mapStateToProps = ({ language_id }) => {
  return { language_id };
};

export default connect(
  mapStateToProps,
  { switchLanguage }
)(Head);
