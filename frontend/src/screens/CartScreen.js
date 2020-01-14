import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen(props) {
  const proccedToCheckout = () => {
    props.history.push('/signin?redirect=/shipping');
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.match.params.id) {
      const qty = props.match.params.qty ? Number(props.match.params.qty) : 1;
      dispatch(addToCart(props.match.params.id, qty));
    }
    return () => {
      //
    };
  }, []);
  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, Number(qty)));
  };
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <div>
              <h2>Shopping Cart</h2>
            </div>
            <div>Price</div>
          </li>
          {cartItems.length === 0 && (
            <div>
              Cart is empty!
              {' '}
              <Link to="/">Go shopping</Link>
              {' '}
            </div>
          )}
          {cartItems.map((item) => (
            <li key={item._id}>
              <div className="cart-image">
                <img src={item.image} alt="product" />
              </div>
              <div className="cart-name">
                <div>
                  <a href={`/product/${item._id}`}>{item.name}</a>
                </div>
                <div className="cart-list-actions">
                  <span>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item._id, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()]
                        .map((x) => <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                    </select>
                  </span>
                  <span>
                    {' '}
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item._id)}>Delete</button>
                  </span>
                </div>
              </div>
              <div className="cart-price">
                $
                {item.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-checkout">
        <h3>
          Subtotal (
          {cartItems.reduce((a, c) => a + c.qty, 0)}
          {' '}
          items): $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={proccedToCheckout}
          className="button primary full-width"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
export default CartScreen;
