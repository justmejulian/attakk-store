import { Fragment } from 'preact';
import { actions } from 'astro:actions';
import useIsHydrated from '@utils/hooks/useIsHydrated';

async function fetchSessionStatus(sessionId?: string | null) {
  if (!sessionId) {
    throw new Error('Session ID is required to fetch session status');
  }
  const { data, error } = await actions.stripe.getSessionStatus({ sessionId });
  if (error) {
    throw new Error(`Error fetching session status: ${error.message}`);
  }
  return data;
}

import { useState, useEffect } from 'preact/hooks';
import { clearCart } from '@stores/cartStore';
import { createHumanReadablePrice } from '@utils/currency';

export default function PaymentStatus() {
  // todo: fix
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessionStatus, setSessionStatus] = useState<any>();
  const [loading, setLoading] = useState(true);
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return null;
  }

  useEffect(() => {
    const fetchStatus = async () => {
      const searchParams = new URLSearchParams(window?.location?.search);
      const sessionId = searchParams?.get('session_id');
      setLoading(true);
      const result = await fetchSessionStatus(sessionId);

      if (result.status === 'complete') {
        clearCart();
      }

      setSessionStatus(result);
      setLoading(false);
    };
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <Fragment>
        <p class="text-center">Loading Payment Status...</p>
      </Fragment>
    );
  }

  if (!sessionStatus) {
    return (
      <Fragment>
        <h1 class="mb-4 text-center">Payment Status</h1>
        <p class="text-center text-red-500">No payment status available.</p>
      </Fragment>
    );
  }

  if (sessionStatus.status === 'open') {
    return (
      <Fragment>
        <h1 class="mb-4 text-center">Payment failed</h1>
        <p class="text-center">
          Your payment is still open. Please complete the payment process.
          <br />
          Please return to the checkout page to complete your payment.
        </p>

        <a
          href="/checkout"
          class="hover:text-tertiary hover:decoration-primary mt-6 cursor-pointer py-2 text-center text-black underline-offset-4 hover:underline focus:outline-hidden disabled:text-gray-500 disabled:hover:decoration-white"
        >
          Return to Checkout
        </a>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1 class="mb-4 text-center">Payment Successful</h1>
      <div class="mb-4 flex w-full items-center justify-center">
        <svg
          data-id="4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-16 w-16 text-green-500"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>

      <p class="border-b border-gray-200 pb-2 text-center">
        Amount Paid: {createHumanReadablePrice(sessionStatus.total)}
      </p>

      <p class="border-b border-gray-200 py-2 text-center">
        Payment Id: {sessionStatus.paymentIntentId}
      </p>

      <p class="mt-4 text-center">
        Thank you for your purchase!
        <br />
        Your payment has been successfully processed.
      </p>

      <p class="mt-4 text-center">
        Email confirmation has been sent to{' '}
        <span class="text-tertiary font-thin underline">
          {sessionStatus.customerEmail}
        </span>
        .
      </p>
    </Fragment>
  );
}
