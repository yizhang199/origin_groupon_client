import React from "react";
import { connect } from "react-redux";
import { makeDate } from "../../_helpers";

const Notice = ({ app_status }) => {
  const { isOpen, start_date, end_date } = app_status;

  const renderContent = () => {
    if (isOpen) {
      return (
        <span className="primary">本团截止日期：{makeDate(end_date)}</span>
      );
    }
    return (
      <>
        <span className="primary">当前团已关闭</span>
        <span className="secondary">
          下一团开启日期为:{makeDate(start_date)}
        </span>
      </>
    );
  };

  return (
    <div className={`component-notice ${isOpen ? "open" : "close"}`}>
      {renderContent()}
    </div>
  );
};

const mapStateToProps = ({ app_status }) => {
  return { app_status };
};

export default connect(mapStateToProps)(Notice);
