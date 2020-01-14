import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import products from '../data';

function PlacceOrderScreen(props) {
  const handleContinue = () => {
    props.history.push('/');
  };

  const product = products.find((x) => x._id === '1');
  const cartItems = [product];
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping Address</h3>
            <div>1911, Sherbrook Est, Montreal, Quebec, Canada</div>
          </div>
          <div>
            <h3>Payment Method</h3>
            <div>Visa Cart (**76)</div>
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
                      <span>
                        Qty:
                        <select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </span>
                      <span>
                        <a href="/delete">Delete</a>
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
        </div>
        <div className="placeorder-actions">
          <ul>
            <li>
              <button onClick={handleContinue} type="button" className="button primary full-width">
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>$145</div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>$45</div>
            </li>
            <li>
              <div>Order Total:</div>
              <div>$190</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlacceOrderScreen;
