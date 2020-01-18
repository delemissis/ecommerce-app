import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShipping } from '../actions/cartActions';

function ShippingScreen(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({
      address, city, postalCode, country,
    }));
    props.history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">City </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={address}
                onChange={(e) => setCity(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="postalCode">Postal Code </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="country">Country </label>
              <input
                type="text"
                name="country"
                id="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>
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
export default ShippingScreen;
