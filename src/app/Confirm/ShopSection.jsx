import React from "react";
import { connect } from "react-redux";
import ShopCard from "./ShopCard";
import { fetchShops } from "../../_actions";
class ShopSection extends React.Component {
  componentDidMount() {
    this.props.fetchShops();
  }

  renderShops = () => {
    return this.props.shops.map(shop => {
      return (
        <ShopCard
          key={`shopSectionShop${shop.location_id}`}
          toggleSection={this.props.toggleSection}
          shop={shop}
        />
      );
    });
  };

  render() {
    return <div className={`shop-section`}>{this.renderShops()}</div>;
  }
}

const mapStateToProps = ({ shops }) => {
  return { shops };
};

export default connect(
  mapStateToProps,
  { fetchShops }
)(ShopSection);
