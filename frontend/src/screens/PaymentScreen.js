import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {
  const handleContinue = () => {
    props.history.push('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form action="/api/signin">
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <label htmlFor="cardHolder">Card Holder </label>
              <input type="text" name="cardHolder" id="cardHolder" />
            </li>
            <li>
              <label htmlFor="cardNumber">Card Number </label>
              <input type="number" name="cardNumber" id="cardNumber" />
            </li>
            <li>
              <label htmlFor="expireDate">Expire Date </label>
              <input type="text" name="expireDate" id="expireDate" />
            </li>

            <li>
              <label htmlFor="cvv">CVV </label>
              <input type="text" name="cvv" id="cvv" />
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

export default PaymentScreen;
