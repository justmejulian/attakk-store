import { persistentAtom } from '@nanostores/persistent';

export type CartItem = {
  id: string;
  quantity: number;
};

export const cartItems = persistentAtom<Record<string, CartItem>>(
  'cart',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function addToCart(id: string) {
  const existingItem = cartItems.get()[id];
  if (existingItem) {
    cartItems.set({
      ...cartItems.get(),
      [id]: {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      },
    });
  } else {
    cartItems.set({
      ...cartItems.get(),
      [id]: {
        id,
        quantity: 1,
      },
    });
  }
}

export function getCartItems(): Record<string, CartItem> {
  return cartItems.get();
}

export function removeFromCart(id: string) {
  const currentItems = cartItems.get();
  if (currentItems[id]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...updatedItems } = currentItems;
    cartItems.set(updatedItems);
  }
}

export function clearCart() {
  cartItems.set({});
}

export function decreaseItemQuantity(id: string) {
  const currentItems = cartItems.get();
  if (currentItems[id]) {
    const updatedQuantity = currentItems[id].quantity - 1;
    if (updatedQuantity <= 0) {
      removeFromCart(id);
    } else {
      cartItems.set({
        ...currentItems,
        [id]: {
          ...currentItems[id],
          quantity: updatedQuantity,
        },
      });
    }
  }
}
