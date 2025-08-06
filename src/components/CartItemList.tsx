import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';
import useIsHydrated from '@utils/hooks/useIsHydrated';

import CartItem from './CartItem';

function CartItemList() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return null;

  return Object.keys($cartItems).length ? (
    <ul class="w-full space-y-4">
      {Object.values($cartItems).map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            quantity={cartItem.quantity}
            id={cartItem.id}
            size={cartItem.size}
          />
        );
      })}
    </ul>
  ) : (
    <p>Your cart is empty!</p>
  );
}

export default CartItemList;
