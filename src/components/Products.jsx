import React from "react";
import { connect } from "react-redux";
import { Link, Element } from "react-scroll";
import Carousel from "./Carousel";

import { getProducts } from "../actions";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";
import Head from "./Head";
import "../css/Products.css";

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts(this.props.language_id);
  }

  render() {
    return (
      <React.Fragment>
        <Head title="天府川菜馆" pageName="products" />
        <Carousel />
        <div className="component-products">
          <div className="component-products__category-list">
            {this.props.products.map(category => {
              return (
                <Link
                  key={`categoryList${category.category_id}`}
                  activeClass="active"
                  to={`nav${category.category_id}`}
                  className="component-products__item"
                  isDynamic={true}
                  offset={-200}
                  spy={true}
                  smooth={true}
                  duration={300}
                  onSetActive={this.handleSetActive}
                  containerId="product-list"
                >
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>

          <div id="product-list" className="component-products__product-list">
            {this.props.products.map(productGroup => {
              return (
                <Element
                  className="component-products__item"
                  key={`productGroup${productGroup.category_id}`}
                  name={`nav${productGroup.category_id}`}
                >
                  <h3 className="">{productGroup.name}</h3>
                  {productGroup.products.map(product => {
                    return (
                      <ProductCard
                        key={`product${product.product_id}`}
                        product={product}
                      />
                    );
                  })}
                </Element>
              );
            })}
          </div>
        </div>
        <ShoppingCart />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ products, language_id }) => {
  return { products, language_id };
};

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
