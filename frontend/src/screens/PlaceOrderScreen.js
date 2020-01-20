import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

function PlacceOrderScreen(props) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, shipping, payment } = cart;
  if (!shipping) {
    props.history.push('/shipping');
  }
  if (!payment) {
    props.history.push('/payment');
  }
  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 10;
  const taxPrice = itemPrice * 0.15;
  const TotalPrice = itemPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = () => {
    dispatch(createOrder(cart));
    // props.history.push('/');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping Address</h3>
            <div>
              {shipping.address}
              ,
              {' '}
              {shipping.city}
              ,
              {' '}
              {shipping.country}
              ,
              {' '}
              {shipping.postalCode}
            </div>
          </div>
          <div>
            <h3>Payment Method</h3>
            <div>
              {payment.method}
            </div>
          </div>
          <div>
            <h3>Order Items</h3>
            <ul className="cart-list-container">
              <li>
                <div />
                <div>Price</div>
              </li>
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
                      Qty:
                      {' '}
                      {item.qty}

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
        </div>
        <div className="placeorder-actions">
          <ul>
            <li>
              <button onClick={handlePlaceOrder} type="button" className="button primary full-width">
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>
                $
                {itemPrice}
              </div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>{shippingPrice ? `$${shippingPrice}` : 'Free'}</div>
            </li>
            <li>
              <div>Tax:</div>
              <div>
                $
                {taxPrice}
              </div>
            </li>
            <li>
              <div>Order Total:</div>
              <div>
                $
                {TotalPrice}

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlacceOrderScreen;
