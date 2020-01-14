import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => (
  <li>
    <div className="product">
      <div className="product-image">
        <Link to={`/product/${props._id}`}>
          <img src={props.image} alt="images" />
        </Link>
      </div>
      <div className="product-name">
        <Link
         to={`/product/${props._id}`}>
          {props.name}
        </Link>
      </div>
      <div className="product-brand">{props.brand}</div>
      <div className="product-price">
        $
        {props.price}
      </div>
      <div className="product-rating">
        {props.rating}
        {' '}
        stars (
        {props.numReviews}
        )
      </div>
    </div>
  </li>
);
export default Product;
