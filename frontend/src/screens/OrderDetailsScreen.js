import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsOrder } from '../actions/orderActions';

function OrderDetailsScreen(props) {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);

  const {
    orderItems, shipping, payment, loading, error,
  } = orderDetails;

  if (!shipping) {
    props.history.push('/shipping');
  }
  if (!payment) {
    props.history.push('/payment');
  }

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {
      //
    };
  }, [dispatch]);
  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <div>
          <div className="back-to-results">
            <Link to="/"> ‹ Back to list</Link>
          </div>

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
                  {payment.paymentMethod}
                </div>
              </div>
              <div>
                <h3>Order Items</h3>
                <ul className="order-list-container">
                  <li>
                    <div />
                    <div>Price</div>
                  </li>
                  {orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="order-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="order-name">
                        <div>
                          <a href={`/product/${item._id}`}>{item.name}</a>
                        </div>
                        <div className="order-list-actions">
                      Qty:
                          {' '}
                          {item.qty}

                        </div>
                      </div>
                      <div className="order-price">
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
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Items:</div>
                  <div>
                $
                    {order.itemPrice}
                  </div>
                </li>
                <li>
                  <div>Shipping:</div>
                  <div>{order.shippingPrice ? `$${order.shippingPrice}` : 'Free'}</div>
                </li>
                <li>
                  <div>Tax:</div>
                  <div>
                $
                    {order.taxPrice}
                  </div>
                </li>
                <li>
                  <div>Order Total:</div>
                  <div>
                $
                    {order.totalPrice}

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
  );
}
export default OrderDetailsScreen;
