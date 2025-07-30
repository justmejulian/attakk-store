import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';

import useIsHydrated from '@utils/hooks/useIsHydrated';

import CartItem from './CartItem';

function Cart() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return null;

  return (
    <div class="mt-8">
      {Object.keys($cartItems).length ? (
        <ul class="space-y-4">
          {Object.values($cartItems).map((cartItem) => (
            <CartItem key={cartItem.id} id={cartItem.id} />
          ))}
        </ul>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
}

export default Cart;
