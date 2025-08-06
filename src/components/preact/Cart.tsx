import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';

function Cart() {
  const $cartItems = useStore(cartItems);

  if (Object.values($cartItems).length) {
    return (
      <ul>
        {Object.values($cartItems).map((cartItem) => (
          <li>
            <h3>{cartItem.id}</h3>
            <p>Quantity: {cartItem.quantity}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p>Your cart is empty!</p>;
}

export default Cart;
