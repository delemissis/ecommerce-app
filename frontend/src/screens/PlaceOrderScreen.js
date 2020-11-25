import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { CART_EMPTY_ITEMS } from '../constants/cartConstants';

function PlaceOrderScreen(props) {
  console.log("general")
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { cartItems, shipping, payment } = cart;
  const {
    loading, success, data: order, error,
  } = orderCreate;
  if (!shipping) {
    console.log("shipping")
    props.history.push('/shipping');
  }
  if (!payment) {
    console.log("payment")
    props.history.push('/payment');
  }
  console.log("problemos")
  cart.itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 10;
  cart.taxPrice = cart.itemPrice * 0.15;
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;
console.log("total price: " + cart.totalPrice)
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: CART_EMPTY_ITEMS });
      Cookies.remove('cartItems');
      console.log("Success Use Effect")
      console.log("total price !: " + cart.totalPrice)
    }
    return () => {
      //
    };
  }, [success]);

  const handlePlaceOrder = () => {
    console.log("total price !!: " + cart.totalPrice)
    dispatch(createOrder(cart));  
  };
  console.log("total pirce ??? " + cart.totalPrice)
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Place Order Shipping Address</h3>
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
              {payment.paymentMethod}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Order Items</h3>
                <div>Price</div>
              </li>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
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
              <button id="placeOrder" onClick={handlePlaceOrder} type="button" className="button primary">
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
                {cart.itemPrice}
              </div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>{cart.shippingPrice ? `$${cart.shippingPrice}` : 'Free'}</div>
            </li>
            <li>
              <div>Tax:</div>
              <div>
                $
                {cart.taxPrice}
              </div>
            </li>
            <li>
              <div>Order Total:</div>
              <div>
                $
                {cart.totalPrice}

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
