import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';

export const selectedSize = atom('');

export type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

export const cartItems = persistentAtom<Record<string, CartItem>>(
  'cart',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function addToCart(id: string, size: string) {
  const key = `${id}-${size}`;
  const existingItem = cartItems.get()[key];
  if (existingItem) {
    cartItems.set({
      ...cartItems.get(),
      [key]: {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      },
    });
  } else {
    cartItems.set({
      ...cartItems.get(),
      [key]: {
        id,
        quantity: 1,
        size,
      },
    });
  }
}

export function getCartItem(id: string, size: string) {
  const key = `${id}-${size}`;
  return cartItems.get()[key];
}

export function getCartItems(): Record<string, CartItem> {
  return cartItems.get();
}

export function removeFromCart(id: string, size: string) {
  const key = `${id}-${size}`;
  const currentItems = cartItems.get();
  if (currentItems[key]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...updatedItems } = currentItems;
    cartItems.set(updatedItems);
  }
}

export function clearCart() {
  cartItems.set({});
}

export function decreaseItemQuantity(id: string, size: string) {
  const key = `${id}-${size}`;
  const currentItems = cartItems.get();
  if (currentItems[key]) {
    const updatedQuantity = currentItems[key].quantity - 1;
    if (updatedQuantity <= 0) {
      removeFromCart(key, size);
    } else {
      cartItems.set({
        ...currentItems,
        [key]: {
          ...currentItems[key],
          quantity: updatedQuantity,
        },
      });
    }
  }
}
