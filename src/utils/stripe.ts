import Stripe from 'stripe';

const stripeSecretKey =
  import.meta.env?.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error(
    'ERROR: Creating Stripe instance failed: Missing Stripe secret key',
  );
  throw new Error('Missing Stripe secret key');
}

const stripe = new Stripe(stripeSecretKey);

export async function getProducts() {
  const products = await stripe.products.list({});
  return products.data;
}

export async function getPrices(productId: string) {
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });
  return prices.data;
}

export async function getPriceById(priceId: string) {
  const price = await stripe.prices.retrieve(priceId);
  return price;
}

export async function createCheckoutSession(
  baseUrl: string,
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
) {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    ui_mode: 'custom',
    line_items: lineItems,
    payment_method_types: ['card', 'twint'],
    return_url: `${baseUrl}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return stripeSession;
}

export async function getSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) {
    return;
  }
  return {
    status: session.status,
    total: session.amount_total,
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    paymentIntentId: session.payment_intent,
  };
}

export async function getOrderedQuantities(): Promise<Record<string, number>> {
  const quantities: Record<string, number> = {};
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const sessions = await stripe.checkout.sessions.list({
      status: 'complete',
      expand: ['data.line_items'],
      limit: 100,
      ...(startingAfter && { starting_after: startingAfter }),
    });

    for (const session of sessions.data) {
      for (const item of session.line_items?.data ?? []) {
        const priceId = item.price?.id;
        if (priceId) {
          quantities[priceId] =
            (quantities[priceId] ?? 0) + (item.quantity ?? 0);
        }
      }
    }

    hasMore = sessions.has_more;
    startingAfter = sessions.data.at(-1)?.id;
  }

  return quantities;
}
