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

function CartButton() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return;

  return (
    <a
      class="hover:text-tertiary cursor-pointer focus:outline-hidden"
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
