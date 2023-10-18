import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import "../StripeCheckout.css";
import { selectOrder } from "../features/order/orderSlice";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51O2TiUGzahrlcm9mtnhYu84ih7byU8wvGC4qpN6rxcK85r09RUw13jwNaNdWIwZAGOzVpmiHj5Td5SUnIlYgKPe900KgjxF2Zh");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const orderData = useSelector(selectOrder);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price:orderData.price}),
      meta:{
        order_id:orderData.id
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
}