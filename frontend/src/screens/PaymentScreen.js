import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePayment } from '../actions/cartActions';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({
      paymentMethod,
    }));
    props.history.push('/placeorder');
    console.log("HERE ! !")
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input type="radio" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} name="paymentMethod" value="paypal" id="paypal" />
                {' '}
                <label htmlFor="paypal">Paypal</label>
              </div>
            </li>
            <li>
              <button
                type="submit"
                id="submit"
                className="button primary"
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
