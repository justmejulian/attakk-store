import { useStore } from '@nanostores/preact';

import { cartItems, type CartItem } from '@stores/cartStore';

import useIsHydrated from '@utils/hooks/useIsHydrated';

function getCartItemsCount(cartItems: Record<string, CartItem>): number {
  if (!cartItems) return 0;

  return Object.values(cartItems).reduce(
    (count, item) => count + item.quantity,
    0,
  );
}

interface Props {
  enabled?: boolean;
}

function CartButton({ enabled = true }: Props) {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!enabled || !isHydrated) return null;

  return (
    <a
      class="hover:text-tertiary decoration-primary cursor-pointer hover:underline focus:outline-hidden"
      href="/cart"
      title="View Cart"
    >
      Cart
      <sup class="text-secondary font-cursive ml-1">
        {getCartItemsCount($cartItems) || ''}
      </sup>
    </a>
  );
}

export default CartButton;
