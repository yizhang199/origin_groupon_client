import React from "react";

import "../css/Head.css";

const Head = props => {
  return (
    <div className="component-head">
      <i className="material-icons">g_translate</i>
      <span>{props.title}</span>
      <i className="material-icons">account_circle</i>
    </div>
  );
};

export default Head;
