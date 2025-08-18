import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { createCheckoutSession, getSessionStatus } from '@utils/stripe';

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
        const stripeSession = await createCheckoutSession(
          baseUrl,
          input.lineItems,
        );
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

  getSessionStatus: defineAction({
    input: z.object({
      sessionId: z.string(),
    }),
    handler: async (input) => {
      const session = await getSessionStatus(input.sessionId);
      if (!session) {
        throw new ActionError({
          code: 'NOT_FOUND',
          message: 'Checkout session not found',
        });
      }
      return session;
    },
  }),
};
