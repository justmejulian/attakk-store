import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';

import useIsHydrated from '@utils/hooks/useIsHydrated';

function CartButton() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return;

  return (
    <a
      class="hover:bg-primary border-tertiary text-tertiary hover:text-secondary cursor-pointer border-2 px-4 py-1 focus:ring-3 focus:outline-hidden"
      href="/cart"
      title="View Cart"
    >
      Cart ({Object.keys($cartItems).length})
    </a>
  );
}

export default CartButton;
