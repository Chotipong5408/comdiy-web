import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message);
    } else if (payload.paymentIntent.status === "succeeded") {
      saveOrder(token, payload)
        .then(() => {
          clearCart();
          toast.success("ชำระเงินสำเร็จ!!!");
          navigate("/user/history");
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("ชำระเงินไม่สำเร็จ");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        ชำระเงิน
      </h2>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        {/* Payment Element */}
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          className="border rounded-lg p-4"
        />

        {/* Submit Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg text-white ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner border-t-transparent border-white mx-auto w-5 h-5 border-2 border-solid rounded-full animate-spin"></div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>

        {/* Message */}
        {message && (
          <div
            id="payment-message"
            className="text-red-500 text-sm text-center mt-4"
          >
            {message}
          </div>
        )}
      </form>
    </div>
    </div>
  );
}
