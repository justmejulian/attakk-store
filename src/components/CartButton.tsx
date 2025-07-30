import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';

import useIsHydrated from '@utils/hooks/useIsHydrated';

function CartButton() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return;

  return (
    <a
      className="inline-block cursor-pointer rounded-sm border border-indigo-600 px-8 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white"
      href="/cart"
      title="View Cart"
    >
      Cart ({Object.keys($cartItems).length})
    </a>
  );
}

export default CartButton;
