const API_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const handlePayment = async (amount, onSuccess) => {
  const options = {
    key: API_KEY,
    amount: amount * 100,
    currency: "INR",
    name: "My Store",
    description: "Test Transaction",

    handler: function (response) {
      alert("Payment Successful\nPayment ID: " + response.razorpay_payment_id);
      if (typeof onSuccess === "function") {
        onSuccess(response);
      }
    },

    prefill: {
      name: "Om",
      email: "test@example.com",
      contact: "9999999999",
    },

    theme: {
      color: "#3399cc",
    },
  };

  if (!window.Razorpay) {
    alert("Payment gateway is not loaded. Please refresh and try again.");
    return;
  }

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export { handlePayment };
