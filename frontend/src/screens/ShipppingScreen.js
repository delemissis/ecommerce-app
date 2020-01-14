import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {
  const handleContinue = () => {
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="shipping">
        <form action="/api/signin">
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address </label>
              <input type="text" name="address" id="address" />
            </li>
            <li>
              <label htmlFor="city">City </label>
              <input type="text" name="city" id="city" />
            </li>

            <li>
              <label htmlFor="postalCode">Postal Code </label>
              <input type="text" name="postalCode" id="postalCode" />
            </li>
            <li>
              <label htmlFor="country">Country </label>
              <input type="text" name="country" id="country" />
            </li>
            <li>
              <button
                type="button"
                onClick={handleContinue}
                className="button primary full-width"
              >
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default ShippingScreen;
