import React from "react";
import { connect } from "react-redux";

import { selectDate, selectShop } from "../../_actions";

class ShopCard extends React.Component {
  state = { selectedDate: "text_label" };
  renderAvaliableDates = () => {
    const { open, name } = this.props.shop;
    return (
      <>
        <option value="text_label" disabled={true}>
          --请选择时间--
        </option>
        {open.map((date, index) => {
          return (
            <option key={`availableDate${name}${index}`} value={date}>
              {date}
            </option>
          );
        })}
      </>
    );
  };
  handleOnChange = e => {
    this.setState({ selectedDate: e.target.value });
    this.props.selectDate(e.target.value);
    this.props.toggleSection("showShopListSection");
  };

  handleOnShopChange = e => {
    console.log(e.target.value);

    this.props.selectShop(this.props.shop);
  };

  render() {
    const { location_id, address, telephone, name } = this.props.shop;

    return (
      <label
        className={`shop-card ${
          location_id === this.props.selectedShop.location_id ? `active` : ``
        }`}
      >
        <div className="information">
          <div className="sub-info name">
            <span className="title">店名</span>
            <span className="value">{name}</span>
          </div>
          <div className="sub-info address">
            <span className="title">地址</span>
            <span className="value">{address}</span>
          </div>
          <div className="sub-info date">
            <span className="title">取货日期</span>
            <span className="value">
              <select
                value={
                  location_id === this.props.selectedShop.location_id
                    ? this.props.pickedDate
                    : this.state.selectedDate
                }
                onChange={this.handleOnChange}
                className="value"
                disabled={location_id !== this.props.selectedShop.location_id}
              >
                {this.renderAvaliableDates()}
              </select>
            </span>
          </div>
          <div className="sub-info phone">
            <span className="title">电话</span>
            <span className="value">{telephone}</span>
          </div>
        </div>
        <input
          type="radio"
          name="shop-card"
          value={location_id}
          checked={location_id === this.props.selectedShop.location_id}
          onChange={this.handleOnShopChange}
        />
      </label>
    );
  }
}

const mapStateToProps = ({ pickedDate, selectedShop }) => {
  return { pickedDate, selectedShop };
};

export default connect(
  mapStateToProps,
  { selectDate, selectShop }
)(ShopCard);
