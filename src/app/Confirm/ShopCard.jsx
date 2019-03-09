import React from "react";
import { connect } from "react-redux";

import { selectShop, selectDate } from "../../_actions";

import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import "../css/ShopCard.css";
class ShopCard extends React.Component {
  handleDateChange = e => {
    const newDate = new Date(e);
    // const newDate = new Date(eventDate.setDate(eventDate.getDate() + 1));
    this.props.selectDate(newDate);
  };
  renderCalendar = () => {
    const picked_location = this.props.selectedShop.location_id;
    const component_location = this.props.shop.location_id;

    if (!picked_location || picked_location !== component_location) {
      return null;
    }
    return (
      <label
        onClick={e => {
          e.stopPropagation();
        }}
        className="component-shop-card__date-picker__label"
      >
        <DatePicker
          selected={this.props.pickedDate}
          includeDates={this.props.shop.open}
          onChange={this.handleDateChange}
          shouldCloseOnSelect={true}
          withPortal
        />
        <i className="material-icons">date_range</i>
        <span>select a date</span>
      </label>
    );
  };

  pickStore = () => {
    this.props.selectShop(this.props.shop);
  };
  renderShopContact = () => {
    const picked_location = this.props.selectedShop.location_id;
    const component_location = this.props.shop.location_id;
    if (!picked_location) {
      return (
        <>
          <div className="component-shop-card__name">
            {this.props.shop.name}
          </div>
          <div className="component-shop-card__telephone">
            {this.props.shop.telephone}
          </div>
        </>
      );
    }
    if (picked_location && picked_location === component_location) {
      return null;
    }

    return (
      <>
        <div className="component-shop-card__name">{this.props.shop.name}</div>
        <div className="component-shop-card__telephone">
          {this.props.shop.telephone}
        </div>
      </>
    );
  };
  render() {
    return (
      <div
        className="component-shop-card"
        // style={{
        //   backgroundImage: `url(${baseUrl}/images/${this.props.shop.image})`
        // }}
        onClick={this.pickStore}
      >
        <div className="component-shop-card__address">
          {this.props.shop.address}
        </div>
        <div className="component-shop-card__name-telephone">
          {this.renderShopContact()}
          {this.renderCalendar()}
        </div>
        {/* <div className="component-shop-card__cover" /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ pickedDate, selectedShop, selectedDate }) => {
  return { pickedDate, selectedShop, selectedDate };
};

export default connect(
  mapStateToProps,
  { selectShop, selectDate }
)(ShopCard);

/**
   * render JXS for open dates
   * @returns {JSX}
   
renderOpenDates = () => {
  return (
    <div className="component-shop-card__open-dates-container">
      {this.props.shop.open.map((openDate, index) => {
        let myClass = "component-open-date-tag__content";
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
            toggleSection={this.props.toggleSection}
          />
        );
      })}
    </div>
  );
};
*/
