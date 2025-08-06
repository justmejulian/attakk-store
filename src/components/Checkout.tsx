import { loadStripe, type StripeCheckout } from '@stripe/stripe-js';
import { useStore } from '@nanostores/preact';

import { actions } from 'astro:actions';

import { cartItems, type CartItem } from '@stores/cartStore';
import { getStripeProductId } from '@utils/products';
import { useEffect, useState } from 'preact/hooks';
import StripePaymentElement from './StripPaymenElement';
import StripeEmailInput from './StripeEmailInput';
import StripeSubmitButton from './StripeSubmitButton';

const PUBLIC_STRIPE_KEY =
  import.meta.env.PUBLIC_STRIPE_KEY || process.env.PUBLIC_STRIPE_KEY;

if (!PUBLIC_STRIPE_KEY) {
  console.error('Missing Stripe public key');
  throw new Error('Missing Stripe public key');
}

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
  const [checkout, setCheckout] = useState<StripeCheckout | null>(null);
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    if (checkout) {
      // already initialized
      return;
    }

    stripePromise.then((stripe) => {
      stripe
        ?.initCheckout({
          fetchClientSecret: () => {
            return fetchClientSecret({ baseUrl, cartItems: $cartItems });
          },
        })
        .then((checkout) => {
          if (!checkout) {
            console.error('Stripe checkout initialization failed');
            return setCheckout(null);
          }
          setCheckout(checkout);
        });
    });
  });

  return (
    <form
      id="payment-form"
      class="w-1/2 min-w-sm overflow-scroll border-gray-200 bg-white p-6 md:border-l-1"
    >
      <h2 class="mb-4">Payment</h2>
      <StripeEmailInput
        setHasError={setHasError}
        updateEmail={checkout?.updateEmail}
      />
      <h5 class="mt-3 mb-1">Payment method</h5>
      <StripePaymentElement
        createPaymentElement={checkout?.createPaymentElement}
      />
      <StripeSubmitButton hasError={hasError} confirm={checkout?.confirm} />
      <div id="payment-message" class="mt-2 hidden text-sm text-red-500">
        <div class="spinner h-5 w-5 animate-spin rounded-full shadow-inner"></div>
      </div>
      <div class="mt-4">
        <a href="https://stripe.com" target="_blank" rel="noopener">
          <div class="flex items-center justify-center gap-1 text-xs text-gray-500">
            Powered by
            <span>
              <svg
                class="fill-gray-500"
                focusable="false"
                width="33"
                height="15"
                role="img"
                aria-labelledby="stripe-title"
              >
                <title>Stripe</title>
                <g fill-rule="evenodd">
                  <path d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843zM15.772 3.94h2.268v7.905h-2.268zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.117-1.716.533-1.716-.804V5.865h1.716V3.94H8.816l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.93 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"></path>
                </g>
              </svg>
            </span>
          </div>
        </a>
      </div>
    </form>
  );
}
