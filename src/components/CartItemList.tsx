import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';
import useIsHydrated from '@utils/hooks/useIsHydrated';
import { getProductById } from '@content/products';

import CartItem from './CartItem';

function CartItemList() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return null;

  return Object.keys($cartItems).length ? (
    <ul class="w-full space-y-4">
      {Object.values($cartItems).map((cartItem) => {
        try {
          const product = getProductById(cartItem.id);

          return (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              product={product}
            />
          );
        } catch (error) {
          console.error('Error fetching product:', error);
          // Todo: clear the cart item if product not found
          // maybe do all of this in the CartItem
          return 'Something went wrong while fetching the product.';
        }
      })}
    </ul>
  ) : (
    <p>Your cart is empty!</p>
  );
}

export default CartItemList;
