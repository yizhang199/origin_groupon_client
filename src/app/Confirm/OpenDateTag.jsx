import React from "react";
import { connect } from "react-redux";

import { pickedDate } from "../../_actions";

// import "../css/OpenDateTag.css";
class OpenDateTag extends React.Component {
  handlePickedDate = () => {
    this.props.pickedDate({
      date: this.props.date,
      location_id: this.props.shop.location_id,
      shop_name: this.props.shop.name
    });
    this.props.toggleSection();
  };

  /**
   * format open date
   * @param {String} openDate
   * @returns {String} formatted Open Date
   */
  makeDate = openDate => {
    const dt = new Date(openDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const cusYear = dt.getFullYear();
    const cusMonth = months[dt.getMonth()];
    const dtDate = dt.getDate();
    const cusDate = dtDate > 9 ? dtDate : `0${dtDate}`;
    return `${cusMonth} ${cusDate}, ${cusYear}`;
  };
  render() {
    return (
      <div className="component-open-date-tag" onClick={this.handlePickedDate}>
        <span className={this.props.myClass}>
          {this.makeDate(this.props.date)}
        </span>
      </div>
    );
  }
}

export default connect(
  null,
  { pickedDate }
)(OpenDateTag);
