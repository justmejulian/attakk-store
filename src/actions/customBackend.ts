import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { createOrder as createBackendOrder } from '@utils/backend';

export const createOrder = defineAction({
  input: z.object({
    email: z.string().email(),
    phone: z.string().min(1),
    lineItems: z.array(
      z.object({
        price_id: z.string(),
        quantity: z.number().min(1),
      }),
    ),
  }),
  handler: async (input) => {
    try {
      const referenceNumber = await createBackendOrder(
        input.email,
        input.phone,
        input.lineItems,
      );
      return { referenceNumber, email: input.email };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          error instanceof Error ? error.message : 'Failed to create order',
      });
    }
  },
});
