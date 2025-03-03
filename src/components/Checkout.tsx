"use client";

import { useCart } from "@/hook/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import Button from "./reusables/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Checkout() {
  const router = useRouter();

  const { cartProducts, paymentIntent, handlePaymentIntent } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      setIsLoading(true);
      setIsError(false);

      fetch("/api/createPaymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setIsLoading(false);

          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          if (data && data.paymentIntent) {
            setClientSecret(data.paymentIntent.client_secret);
            handlePaymentIntent(data.paymentIntent.id);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [cartProducts, paymentIntent, handlePaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handlePaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {" "}
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handlePaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
      {isLoading && <div className="text-center">Loading Checkout</div>}
      {isError && (
        <div className="text-center text-rose-500">Something went wrong.</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-center text-teal-500">Payment Successful</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View your orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
