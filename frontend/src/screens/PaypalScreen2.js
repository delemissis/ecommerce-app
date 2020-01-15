import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PaypalButton = (props) => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = () => {
    const clientID = process.env.PAYPAL_CLIENT_ID || 'sb';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (
      window !== undefined
      && window.paypal !== undefined
      && props.onButtonReady
    ) {
      props.onButtonReady();
    }
  }, []);


  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount,
        },
      },
    ],
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then((details) => {
      if (props.onSuccess) {
        return props.onSuccess(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (!sdkReady && window.paypal === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  const Button = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM,
  });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={{
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      }}
    />
  );
};

const ButtonP = () => (
  <PaypalButton
    amount="1.00"
    onError={() => console.log('error')}
    onSuccess={() => console.log('success')}
    onCancel={() => console.log('cancel')}
  />
);
export default ButtonP;
