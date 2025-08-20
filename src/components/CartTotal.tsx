import { useStore } from '@nanostores/preact';
import { cartItems } from '@stores/cartStore';
import { createHumanReadablePrice } from '@utils/currency';
import useIsHydrated from '@utils/hooks/useIsHydrated';
import { getProductById } from '@utils/products';

function CartTotal() {
  const isHydrated = useIsHydrated();
  const $cartItems = useStore(cartItems);
  const total = Object.values($cartItems).reduce((acc, item) => {
    const product = getProductById(item.id);
    return acc + product.price * item.quantity;
  }, 0);

  if (!isHydrated) return null;

  return (
    <dl className="space-y-0.5 text-sm">
      <div className="flex justify-between !text-base font-medium">
        <dt>Total</dt>
        <dd>{createHumanReadablePrice(total)}</dd>
      </div>
    </dl>
  );
}

export default CartTotal;
