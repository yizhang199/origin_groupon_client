import React from "react";

import "../css/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="component-product-card" data-test="component-product-card">
      <div className="component-product-card__header">
        <div className="component-product-card__image-container">
          <img src={`images/products/default.jpeg`} alt="" />
        </div>
        <div className="component-product-card__info">
          <div
            className="component-product-card__name"
            data-test="product-name"
          >
            {product.name}
          </div>
          <div className="component-product-card__quantity">
            {product.quantity}
          </div>
          <div className="component-product-card__price">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
