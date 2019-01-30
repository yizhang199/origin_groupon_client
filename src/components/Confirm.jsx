import React from "react";
import { connect } from "react-redux";

import ShopCard from "./ShopCard";
import { getShops } from "../actions";
import "../css/Confirm.css";
class Confirm extends React.Component {
  /**
   * call api fetch shop list
   * @returns update state.shops in redux store
   */
  componentDidMount() {
    this.props.getShops();
  }

  /**
   * render JSX shop list
   * @returns {JSX} list of ShopCard.jsx
   */
  renderShopList = () => {
    return this.props.shops.map((shop, index) => {
      return <ShopCard key={`shop${index}`} shop={shop} />;
    });
  };
  render() {
    return (
      <div className="component-confirm">
        <div className="componente-confirm__shops-header">shops</div>
        {this.renderShopList()}
      </div>
    );
  }
}

const mapStateToProps = ({ shops }) => {
  return { shops };
};

export default connect(
  mapStateToProps,
  { getShops }
)(Confirm);
