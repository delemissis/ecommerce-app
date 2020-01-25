import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const addToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };
  const dispatch = useDispatch();


  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { loading: loadingSaveReview, error: errorSaveReview, success: successSaveReview } = productReviewSave;

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    if (successSaveReview) {
      setComment('');
      setRating('');
      alert('Review Submitted');
    }
    return () => {
      //
    };
  }, [successSaveReview]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProductReview(props.match.params.id, { comment, rating }));
  };
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
                  <Rating value={product.rating} />
                  (
                  {product.numReviews}
                  {' '}
                  Customer reviews
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
                  Description:
                  <div>{product.description}</div>
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
          <div className="content-margined">
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <div>There is no review.</div>}
            <ul className="review">
              {
                product.reviews.map((review) => (
                  <li key={review._id}>
                    <div><b>{review.name}</b></div>
                    <div className="rating-container">
                      <Rating value={review.rating} />
                      <div>
                        {review.createdAt.substring(0, 10)}
                      </div>
                    </div>
                    <div>
                      {review.comment}
                    </div>
                  </li>
                ))
              }
              <li>
                <h3>Write a customer reviews</h3>

                {window.isAuth
                  ? (
                    <form onSubmit={submitHandler}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="rating">Rating</label>
                          <select required value={rating} name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                            <option value="">Select</option>
                            <option value="1">1 = Poor</option>
                            <option value="2">2 = Fair</option>
                            <option value="3">3 = Good</option>
                            <option value="4">4 = Very Good</option>
                            <option value="5">5 = Excellent</option>
                          </select>
                        </li>
                        <li>
                          <label htmlFor="comment">Comment</label>

                          <textarea required value={comment} name="comment" id="comment" onChange={(e) => setComment(e.target.value)} />

                        </li>
                        <li>
                          <button type="submit" className="button primary">Submit</button>
                        </li>
                      </ul>
                    </form>
                  )
                  : (
                    <div>
Please
                      {' '}
                      <Link to="/signin">Signin</Link>
                      {' '}
to write a review.
                    </div>

                  ) }

              </li>
            </ul>
          </div>
        </div>
      )
  );
}
export default ProductScreen;
