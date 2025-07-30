import { map } from 'nanostores';

export type CartItem = {
  id: string;
  quantity: number;
};

export const cartItems = map<Record<string, CartItem>>({});

export function addToCart(id: string) {
  const existingItem = cartItems.get()[id];
  if (existingItem) {
    cartItems.setKey(id, {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    });
  } else {
    cartItems.setKey(id, {
      id,
      quantity: 1,
    });
  }
}

export function getCartItems(): Record<string, CartItem> {
  return cartItems.get();
}
