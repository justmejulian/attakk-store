import products, { type Product } from '@content/products.ts';
import passedProducts from '@content/passedProducts.ts';
import { clearCart } from '@stores/cartStore';

export function getProducts(): Product[] {
  const productList = Object.values(products);
  // return [...productList, ...productList];
  return productList;
}

export function getProductById(id: string): Product {
  if (!id) {
    throw new Error('Product ID is required');
  }
  const product = products.find((product) => product.id === id);

  if (!product) {
    console.log('Cart is in broken state, clearing cart');
    clearCart();
    throw new Error(`Product with ID ${id} not found`);
  }
  return product;
}

export function getStripeProductId(productId: string, size: string) {
  const product = getProductById(productId);
  const stripeProductId = product.sizes?.[size]?.stripeProductId;
  if (!stripeProductId) {
    throw new Error(
      `Stripe product ID not found for product ID ${productId} and size ${size}`,
    );
  }
  return stripeProductId;
}

export function getPassedProducts() {
  return passedProducts;
}
