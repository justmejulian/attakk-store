import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';
import useIsHydrated from '@utils/hooks/useIsHydrated';
import { getProductById } from '@content/products';

import Button from '@components/Button';

import CartItem from './CartItem';

function Cart() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);

  if (!isHydrated) return null;

  return (
    <div class="mt-8 w-full max-w-2xl">
      {Object.keys($cartItems).length ? (
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
      )}

      <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
        <div className="w-screen max-w-lg space-y-4">
          <dl className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>£250</dd>
            </div>

            <div className="flex justify-between">
              <dt>VAT</dt>
              <dd>42.00 CHF</dd>
            </div>

            <div className="flex justify-between !text-base font-medium">
              <dt>Total</dt>
              <dd>£200</dd>
            </div>
          </dl>

          <div className="flex justify-end">
            <Button
              title="Checkout"
              onClick={() => {
                // Handle checkout logic here
                console.log('Proceeding to checkout...');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
