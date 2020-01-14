import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsProduct } from '../actions/productActions';

function DetailsScreen(props) {
  const [qty, setQty] = useState(1);
  const addToCart = () => {
    props.history.push(`/cart/${props.match.params.id}/${qty}`);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [dispatch]);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <div>
          <div className="back-to-results">
            <Link to="/"> ‹ Back to results</Link>
          </div>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h3>{product.name}</h3>
                </li>
                <li>
                  Rating:
                  {' '}
                  {product.rating}
                  {' '}
                  (
                  {product.reviews}
                  )
                </li>
                <li>
                  Price:
                  {' '}
                  <span className="price">
                    {' '}
                    $
                    {product.price}
                  </span>
                </li>

                <li>
                  Features:
                  <ul>
                    {product.features.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="details-actions">
              <ul>
                <li>
                  Price: $
                  {product.price}
                </li>
                <li>
                  State:
                  {' '}
                  {product.countInStock > 0 ? 'InStock' : 'Unavailable'}
                </li>
                {
                  product.countInStock && (
                    <li>
                      Qty:
                      <select value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  )
                }
                {
                  product.countInStock && (
                    <li>
                      <button type="button" onClick={addToCart} className="button primary full-width">
                        Add to Cart
                      </button>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      )
  );
}
export default DetailsScreen;
