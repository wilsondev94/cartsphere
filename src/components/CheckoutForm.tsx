"use client";

import { useCart } from "@/hook/useCart";
import { formatPrice } from "@/lib/utils";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "./reusables/Heading";
import Button from "./reusables/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess: (Value: boolean) => void;
}

export default function CheckoutForm({
  clientSecret,
  handlePaymentSuccess,
}: CheckoutFormProps) {
  const { cartTotalAmount, handlePaymentIntent, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) return;
    handlePaymentSuccess(false);
  }, [stripe]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Successful");
          clearCart();
          handlePaymentSuccess(true);
          handlePaymentIntent(null);
        }

        setIsLoading(false);
      });
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Heading title="Enter your details to complete checkout" />

      <h2 className="font-semibold mb-2">Address information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "NG"],
        }}
      />

      <h2 className="font-semibold mt-4 mb-2">Payment information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>

      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
}
