import * as stripeActions from './stripe';
import * as customBackendActions from './customBackend';

export const server = {
  stripe: stripeActions,
  customBackend: customBackendActions,
};
