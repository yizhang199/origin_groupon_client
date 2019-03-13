import React from "react";
import { connect } from "react-redux";
import { makeDate } from "../../_helpers";

const Notice = ({ app_status }) => {
  const { isOpen, start_date, end_date } = app_status;

  const renderContent = () => {
    if (isOpen) {
      return <p>本团截止日期：{makeDate(end_date)}</p>;
    }
    return <p>当前团已关闭，下一团开启日期为:{makeDate(start_date)}</p>;
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = ({ app_status }) => {
  return { app_status };
};

export default connect(mapStateToProps)(Notice);
