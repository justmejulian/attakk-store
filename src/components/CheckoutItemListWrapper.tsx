import { useStore } from '@nanostores/preact';
import { cartItems } from '@stores/cartStore';
import { getStripeProductId } from '@utils/products';
import CheckoutItemList, { type LineItem } from './CheckoutItemList';
import useIsHydrated from '@utils/hooks/useIsHydrated';

export default function CheckoutItemListWrapper() {
  const isHydrated = useIsHydrated();

  const $cartItems = useStore(cartItems);

  if (!isHydrated) {
    return null;
  }

  if (!$cartItems || Object.keys($cartItems).length === 0) {
    return null;
  }

  const lineItems: LineItem[] = Object.values($cartItems).map((item) => ({
    price_id: getStripeProductId(item.id, item.size),
    quantity: item.quantity,
  }));

  return <CheckoutItemList lineItems={lineItems} />;
}
