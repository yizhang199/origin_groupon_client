import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import ChoiceForm from "./ChoiceForm";
import { hideModal } from "../actions";

import "../css/Modal.css";

const Modal = ({ hideModal, modalStatus, content, product }) => {
  const renderContent = () => {
    switch (content) {
      case "cover":
        return <h1>cover compnent</h1>;
      case "choice form":
        return <ChoiceForm toggleOptionForm={hideModal} product={product} />;
      default:
        break;
    }
  };

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
      {renderContent()}
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
