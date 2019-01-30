import React from "react";
import { connect } from "react-redux";

import { pickedDate } from "../actions";
import OpenDateTag from "./OpenDateTag";

import "../css/ShopCard.css";
class ShopCard extends React.Component {
  /**
   * render JXS for open dates
   * @returns {JSX}
   */
  renderOpenDates = () => {
    return (
      <div className="component-shop-card__open-dates-container">
        {this.props.shop.open.map((openDate, index) => {
          let myClass = "component-open-date-tag__content";
          console.log(this.props);

          if (this.props.date.date) {
            if (
              this.props.date.date === openDate &&
              this.props.date.location_id === this.props.shop.location_id
            ) {
              myClass = "component-open-date-tag__content";
            } else {
              myClass = "component-open-date-tag__content disable";
            }
          }
          return (
            <OpenDateTag
              key={`openDate${index}`}
              shop={this.props.shop}
              date={openDate}
              myClass={myClass}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div
        className="component-shop-card"
        style={{ backgroundImage: `url(/images/${this.props.shop.image})` }}
      >
        <div className="component-shop-card__name">{this.props.shop.name}</div>
        <div className="component-shop-card__address">
          {this.props.shop.address}
        </div>
        <div className="component-shop-card__telephone">
          {this.props.shop.telephone}
        </div>
        {this.renderOpenDates()}
        <div className="component-shop-card__cover" />
      </div>
    );
  }
}

const mapStateToProps = ({ pickedDate }) => {
  return { date: pickedDate };
};

export default connect(
  mapStateToProps,
  { pickedDate }
)(ShopCard);
