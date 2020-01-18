import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePayment } from '../actions/cartActions';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({
      paymentMethod, cardNumber, expireDate, cvv,
    }));
    props.history.push('/placeorder');
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
              <div>
                <input type="radio" checked={paymentMethod === 'creditcard'} onChange={() => setPaymentMethod('creditcard')} name="paymentMethod" value="creditcard" id="creditcard" />
                {' '}
                <label htmlFor="creditcard">Credit Card</label>
              </div>
            </li>
            {paymentMethod === 'creditcard'
              && (
                <>
                  <li>
                    <label htmlFor="cardNumber">Card Number </label>
                    <input
                      type="number"
                      name="cardNumber"
                      id="cardNumber"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </li>
                  <li>
                    <label htmlFor="expireDate">Expire Date </label>
                    <input
                      type="text"
                      name="expireDate"
                      id="expireDate"
                      required
                      value={expireDate}
                      onChange={(e) => setExpireDate(e.target.value)}
                    />
                  </li>

                  <li>
                    <label htmlFor="cvv">CVV </label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </li>

                </>
              )}
            <li>
              <button
                type="submit"
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
