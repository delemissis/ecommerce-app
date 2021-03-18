import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const PayButton = (props) => {

    // const handleSuccessPayment1 = () => {
    //     console.log("Here")
    //     // dispatch(payOrder(order, paymentResult));
    //   };

    return (
        <button onClick={props.handleSuccessPayment}>
            Pay!
        </button>
    );
}


export default PayButton;
