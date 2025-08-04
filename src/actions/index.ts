import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import Stripe from 'stripe';

const stripeSecretKey =
  import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing Stripe secret key');
}

const stripe = new Stripe(stripeSecretKey);

export const server = {
  createCheckout: defineAction({
    input: z.object({
      lineItems: z.array(
        z.object({
          price: z.string(),
          quantity: z.number().min(1),
        }),
      ),
      baseUrl: z.string().url(),
    }),
    handler: async (input) => {
      const baseUrl = input.baseUrl;
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          mode: 'payment',
          ui_mode: 'custom',
          line_items: input.lineItems,
          payment_method_types: ['card', 'twint'],
          return_url: `${baseUrl}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        if (!stripeSession.client_secret) {
          throw new ActionError({
            code: 'NOT_FOUND',
            message: 'Could not create Stripe session',
          });
        }

        return stripeSession;
      } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create Stripe checkout session',
        });
      }
    },
  }),

  getStripeProducts: defineAction({
    input: z.object({}),
    handler: async () => {
      const products = await stripe.products.list({
        limit: 3,
      });

      return {
        products: products.data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          images: product.images,
        })),
      };
    },
  }),
};
