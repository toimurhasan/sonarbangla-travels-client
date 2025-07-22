import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "react-router";
import Swal from "sweetalert2";

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  //   const [clientSecret, setClientSecret] = useState("");
  //   useEffect(() => {
  //     const getClientSecret = async () => {
  //       // ...server request
  //       const { data } = await axios.post("http://localhost:3000/api/create-payment-intent", );
  //     };
  //     getClientSecret();
  //   }, []);

  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3000/api/booking/${bookingId}`)
      .then((res) => res.json())
      .then((data) => setPrice(data.price * 100));
  }, []);

  // console.log(typeof price);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setCardError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }
    if (price) {
      // Step 1: Create PaymentIntent on your backend
      try {
        const res = await fetch("http://localhost:3000/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: price, // amount in cents (i.e., $20.00)
            currency: "usd", // or "bdt", "eur", etc.
          }),
        });

        const data = await res.json();
        const clientSecret = data.clientSecret;

        // Step 2: Confirm the card payment using clientSecret
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
          },
        });

        if (result.error) {
          console.error("[PaymentError]", result.error);
          setCardError(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            console.log("[PaymentIntent]", result.paymentIntent);

            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: `Transaction ID: ${result.paymentIntent.id}`,
            });

            // Save payment to DB and update booking status
            try {
              await axios.post("http://localhost:3000/api/payments", {
                bookingId: bookingId,
                amount: result.paymentIntent.amount, // in cents
                currency: result.paymentIntent.currency,
                transactionId: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method,
                status: "in review", // new status
                paymentDate: new Date().toISOString(),
              });
            } catch (error) {
              console.error("Failed to save payment:", error);
              Swal.fire({
                icon: "warning",
                title: "Payment done, but failed to update database.",
                text: "Please contact support.",
              });
            }
          }
        }
      } catch (err) {
        console.error("Payment failed:", err);
        setCardError("Payment failed. ");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-error mb-2">{cardError} Try again later.</p>}
      <button type="submit" className="btn btn-success" disabled={!stripe || processing}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
