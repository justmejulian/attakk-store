import { Fragment } from 'preact';

import useIsHydrated from '@utils/hooks/useIsHydrated';
import { useState, useEffect } from 'preact/hooks';
import { actions } from 'astro:actions';
import { createHumanReadablePrice } from '@utils/currency';

type LineItem = {
  price_id: string;
  quantity: number;
};

export default function OrderConfirmation() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const isHydrated = useIsHydrated();

  useEffect(() => {
    const fetchOrderData = async () => {
      const searchParams = new URLSearchParams(window?.location?.search);
      const ref = searchParams?.get('reference_number');
      const lineItemsParam = searchParams?.get('line_items');

      setReferenceNumber(ref || '');

      if (lineItemsParam) {
        try {
          const lineItems: LineItem[] = JSON.parse(lineItemsParam);
          const { data, error } = await actions.stripe.getLineItemsTotal({
            lineItems,
          });

          if (error) {
            console.error('Error fetching total:', error);
          } else if (data) {
            setTotal(data.total);
          }
        } catch (error) {
          console.error('Error parsing line items:', error);
        }
      }

      setLoading(false);
    };

    fetchOrderData();
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (loading) {
    return <p class="text-center">Loading...</p>;
  }

  if (!referenceNumber) {
    return (
      <Fragment>
        <h1 class="mb-4 text-center">Order Confirmation</h1>
        <p class="text-center text-red-500">No order reference found.</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1 class="mb-4 text-center">Order Placed Successfully</h1>
      <div class="mb-4 flex w-full items-center justify-center">
        <svg
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
        Reference Number: <strong>{referenceNumber}</strong>
      </p>

      {total !== null && (
        <p class="border-b border-gray-200 py-2 text-center">
          Total: <strong>{createHumanReadablePrice(total)}</strong>
        </p>
      )}

      <p class="mt-4 text-center">
        Thanks for riding with us.
        <br />
        To complete your order, please send the full amount via bank transfer to
        the following IBAN:
      </p>
      <code class="mt-4">
        IBAN: CH03 0070 0114 8043 3916 5
        <br />
        Recipient: ATTAKK
        <br />
        Collective Reference: Your Order Number (e.g. #1247)
      </code>

      <p class="mt-4 text-center">
        Your order is only confirmed once payment is received. All items are
        produced on demand and will be ready for pickup at ATTAKK HQ in approx.
        6–10 weeks.
      </p>

      <p class="mt-4 text-center">
        Limited drop. No restocks.
        <br />
        Thanks for supporting the crew.
      </p>
    </Fragment>
  );
}
