import { useEffect } from 'preact/hooks';

import { type StripePaymentElement } from '@stripe/stripe-js';

interface Props {
  createPaymentElement?: () => StripePaymentElement;
}

export default function StripePaymentElement({ createPaymentElement }: Props) {
  useEffect(() => {
    const paymentElement = createPaymentElement?.();
    paymentElement?.mount('#payment-element');

    return () => {
      paymentElement?.unmount();
    };
  }, [createPaymentElement]);

  return <div id="payment-element"></div>;
}
