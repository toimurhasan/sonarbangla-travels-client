import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const { bookingId } = useParams();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
  return (
    <div className="ml-8">
      <h1 className="py-4 text-2xl font-semibold">Pay for Booking: {bookingId}</h1>
      {/* Stripe logic goes here */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
