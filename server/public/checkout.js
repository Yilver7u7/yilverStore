// This is your test secret API key.
const stripe = Stripe("pk_test_51QOLu0BhDXj7Wugy7CcAwCaYRVHDmKiMxdoBFZqi0TWq2nG3bCwEvpEz9RQvT7Nah6If3Jmyt1I6O62PdE6AjgK200QdmHFTke");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}