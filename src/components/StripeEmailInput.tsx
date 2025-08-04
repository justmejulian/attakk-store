import type { StripeCheckoutUpdateEmailResult } from '@stripe/stripe-js';
import { useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

interface Props {
  updateEmail?: (email: string) => Promise<StripeCheckoutUpdateEmailResult>;
  setHasError?: (hasError: boolean) => void;
}

export default function StripeEmailInput({ updateEmail, setHasError }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const setCheckoutEmail = async (email: string) => {
    if (!updateEmail) {
      return { isValid: true, message: null };
    }

    setHasError?.(false);

    const updateResult = await updateEmail(email);
    const isValid = updateResult.type !== 'error';

    setHasError?.(!isValid);

    return { isValid, message: !isValid ? updateResult.error.message : null };
  };

  return (
    <Fragment>
      <label>
        Email
        <input
          type="text"
          id="email"
          class="mt-1 h-11 w-full rounded-md border border-gray-300 p-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          value={email}
          onInput={async (e) => {
            setEmail(e?.currentTarget?.value);
            setHasError?.(false);
            if (emailError) {
              setEmailError('');
              const { isValid, message } = await setCheckoutEmail(email);
              if (!isValid && message) {
                setEmailError(message);
              }
            }
          }}
          onBlur={async () => {
            if (!email) return;
            const { isValid, message } = await setCheckoutEmail(email);
            if (!isValid && message) {
              setEmailError(message);
            }
          }}
        />
      </label>
      {emailError && (
        <div class="text-sm text-red-500" id="email-error">
          {emailError}
        </div>
      )}
    </Fragment>
  );
}
