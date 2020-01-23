import React, { useState, useEffect } from 'react';
import PaypalButton from '../components/PaypalButton';

const PaypalScreen = () => (
  <PaypalButton
    amount="1.00"
    onError={() => console.log('error')}
    onSuccess={() => console.log('success')}
    onCancel={() => console.log('cancel')}
  />
);
export default PaypalScreen;
