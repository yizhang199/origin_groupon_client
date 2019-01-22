import React from "react";
import { connect } from "react-redux";

import { switchLanguage } from "../actions";

import "../css/Head.css";

const Head = props => {
  const clickLanguageButton = () => {
    props.switchLanguage(props.language_id);
    alert("敬请期待");
  };
  return (
    <div className="component-head">
      <i className="material-icons" onClick={clickLanguageButton}>
        g_translate
      </i>
      <span>{props.title}</span>
      <i className="material-icons">account_circle</i>
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
