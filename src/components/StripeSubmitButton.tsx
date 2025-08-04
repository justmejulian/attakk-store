import type { StripeCheckoutConfirmResult } from '@stripe/stripe-js';
import { useState } from 'preact/hooks';

interface Props {
  hasError: boolean;
  confirm?: () => Promise<StripeCheckoutConfirmResult>;
}

export default function StripeSubmitButton({ hasError, confirm }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);

    if (!confirm) {
      console.error('Confirm function is not provided');
      setLoading(false);
      return;
    }

    const confirmResult = await confirm();

    if (confirmResult.type === 'error') {
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <button
      id="submit"
      disabled={loading || hasError || !confirm}
      onClick={handleSubmit}
      class="mt-4 w-full cursor-pointer rounded-md border-none bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md transition hover:contrast-115 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className={`spinner ${loading ? '' : 'hidden'}`} id="spinner"></div>
      <span id="button-text">{loading ? 'Processing...' : 'Pay now'}</span>
    </button>
  );
}
