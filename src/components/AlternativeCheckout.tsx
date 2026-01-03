import { actions } from 'astro:actions';
import { useStore } from '@nanostores/preact';

import { cartItems, type CartItem, clearCart } from '@stores/cartStore';
import { getStripeProductId } from '@utils/products';
import { useState } from 'preact/hooks';

const fetchCreateOrder = async ({
  cartItems,
  email,
  phone,
}: {
  cartItems: Record<string, CartItem>;
  email: string;
  phone: string;
}) => {
  const lineItems = Object.values(cartItems).map((item) => ({
    price_id: getStripeProductId(item.id, item.size),
    quantity: item.quantity,
  }));

  const { data, error } = await actions.customBackend.createOrder({
    email,
    phone,
    lineItems,
  });

  if (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }

  if (!data?.referenceNumber) {
    throw new Error('No reference number returned');
  }

  return data;
};

interface Props {
  baseUrl: string;
}

export default function AlternativeCheckout({ baseUrl }: Props) {
  const $cartItems = useStore(cartItems);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await fetchCreateOrder({
        cartItems: $cartItems,
        email,
        phone,
      });

      const lineItems = Object.values($cartItems).map((item) => ({
        price_id: getStripeProductId(item.id, item.size),
        quantity: item.quantity,
      }));

      clearCart();

      const url = new URL('/order-confirmation', baseUrl);
      url.searchParams.set('reference_number', result.referenceNumber);
      url.searchParams.set('email', result.email);
      url.searchParams.set('line_items', JSON.stringify(lineItems));

      window.location.href = url.toString();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="payment-form"
      class="w-1/2 min-w-sm overflow-scroll border-gray-200 bg-white p-6 md:border-l-1"
      onSubmit={handleSubmit}
    >
      <h2 class="mb-4">Order Details</h2>

      <div class="mb-4">
        <label htmlFor="email" class="mb-1 block text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          class="w-full rounded border border-gray-300 p-2"
          placeholder="your@email.com"
        />
      </div>

      <div class="mb-4">
        <label htmlFor="phone" class="mb-1 block text-sm">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
          required
          class="w-full rounded border border-gray-300 p-2"
          placeholder="+1234567890"
        />
      </div>

      {error && (
        <div id="error-message" class="mb-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full rounded bg-black p-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}
