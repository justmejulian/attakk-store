import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';

import { useEffect, useState } from 'preact/hooks';

function Cart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return Object.keys($cartItems).length ? (
    <ul>
      {Object.values($cartItems).map((cartItem) => (
        <li>
          <h3>{cartItem.id}</h3>
          <p>Quantity: {cartItem.quantity}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Your cart is empty!</p>
  );
}

export default Cart;
