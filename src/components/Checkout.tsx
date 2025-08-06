import { loadStripe } from '@stripe/stripe-js';
import { useStore } from '@nanostores/preact';

import { actions } from 'astro:actions';

import { cartItems, type CartItem } from '@stores/cartStore';
import { getStripeProductId } from '@utils/products';
import { useEffect } from 'preact/hooks';

const PUBLIC_STRIPE_KEY = import.meta.env.PUBLIC_STRIPE_KEY;

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

const fetchClientSecret = async ({
  baseUrl,
  cartItems,
}: {
  baseUrl: string;
  cartItems: Record<string, CartItem>;
}) => {
  const lineItems = Object.values(cartItems).map((item) => ({
    price: getStripeProductId(item.id, item.size),
    quantity: item.quantity,
  }));
  const { data, error } = await actions.createCheckout({
    lineItems,
    baseUrl,
  });
  console.log('🪚 data:', data);

  if (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }

  if (!data || !data.client_secret) {
    console.error('No client secret returned from checkout session');
    throw new Error('Failed to retrieve client secret');
  }

  return data.client_secret;
};

interface Props {
  baseUrl: string;
}

export default function Checkout({ baseUrl }: Props) {
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    stripePromise.then((stripe) => {
      stripe
        ?.initEmbeddedCheckout({
          fetchClientSecret: () => {
            return fetchClientSecret({ baseUrl, cartItems: $cartItems });
          },
        })
        .then((checkout) => {
          if (!checkout) {
            console.error('Stripe checkout initialization failed');
            return;
          }
          checkout.mount('#checkout');
        });
    });
  });

  return <div id="checkout" />;
}
