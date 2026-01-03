import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import {
  createCheckoutSession,
  getSessionStatus as getStripeSessionStatus,
  getPriceById,
} from '@utils/stripe';

export const createCheckout = defineAction({
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
});

export const getSessionStatus = defineAction({
  input: z.object({
    sessionId: z.string(),
  }),
  handler: async (input) => {
    const session = await getStripeSessionStatus(input.sessionId);
    if (!session) {
      throw new ActionError({
        code: 'NOT_FOUND',
        message: 'Checkout session not found',
      });
    }
    return session;
  },
});

export const getLineItemsTotal = defineAction({
  input: z.object({
    lineItems: z.array(
      z.object({
        price_id: z.string(),
        quantity: z.number().min(1),
      }),
    ),
  }),
  handler: async (input) => {
    try {
      const prices = await Promise.all(
        input.lineItems.map((item) => getPriceById(item.price_id)),
      );

      const total = input.lineItems.reduce((sum, item, index) => {
        const unitAmount = prices[index]?.unit_amount ?? 0;
        return sum + unitAmount * item.quantity;
      }, 0);

      return { total };
    } catch (error) {
      console.error('Error calculating line items total:', error);
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to calculate total',
      });
    }
  },
});
