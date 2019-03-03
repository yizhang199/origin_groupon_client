import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { hideModal } from "../actions";

import "../css/Modal.css";

const Modal = ({ hideModal, modalStatus }) => {
  if (!modalStatus) {
    return null;
  }
  return ReactDOM.createPortal(
    <div
      onClick={() => {
        hideModal();
      }}
      className="component-modal"
    >
      <h1>portal component</h1>
    </div>,
    document.querySelector("#modal")
  );
};
const mapStateToProps = ({ modalStatus }) => {
  return { modalStatus };
};
export default connect(
  mapStateToProps,
  { hideModal }
)(Modal);
