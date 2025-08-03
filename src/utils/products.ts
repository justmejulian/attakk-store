import products, { type Product } from '@content/products.ts';

export function getProducts(): Product[] {
  return Object.values(products);
}

export function getProductById(id: string): Product {
  if (!id) {
    throw new Error('Product ID is required');
  }
  const product = products[id];

  if (!product) {
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
