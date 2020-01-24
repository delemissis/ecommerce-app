import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsOrder, payOrder, deliverOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/profile';

  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
      //
    };
  }, [dispatch, successPay]);
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const handleDeliverOrder = () => {
    dispatch(deliverOrder(order));
  };
  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <div>
          <div className="back-to-results">
            <Link to={redirect}> ‹ Back to list</Link>
            <br />
            <h3>
              Order
              {' '}
              {order._id}
            </h3>
          </div>

          <div className="placeorder">

            <div className="placeorder-info">
              <div>
                <h3>Shipping Address</h3>
                <div>
                  {order.shipping.address}
                  ,
                  {' '}
                  {order.shipping.city}
                  ,
                  {' '}
                  {order.shipping.country}
                  ,
                  {' '}
                  {order.shipping.postalCode}
                </div>
                <h3>
                  {order.isDelivered ? `Delivered At ${order.deliveredAt}` : 'Not Delivered'}

                </h3>
              </div>
              <div>
                <h3>Payment Method</h3>
                <div>
                  {order.payment.paymentMethod}
                </div>
                <h3>

                  {order.isPaid ? `Paid At ${order.paidAt}` : 'Not Paid'}
                </h3>
              </div>
              <div>

                <ul className="cart-list-container">
                  <li>
                    <h3>Order Items</h3>
                    <div>Price</div>
                  </li>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </div>
                        <div className="cart-list-actions">
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
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>

                    <button onClick={handleDeliverOrder} type="button" className="button primary full-width">
                      Deliver Order
                    </button>

                  </li>
                )}

                {!order.isPaid
                  && (
                    <li>
                      <PaypalButton
                        amount="1.00"
                        onError={() => console.log('error')}
                        onSuccess={handleSuccessPayment}
                        onCancel={() => console.log('cancel')}
                      />
                    </li>
                  )}

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
export default OrderScreen;
