import {
  getImportedProductById,
  getProducts,
  type Product,
} from '@content/products.ts';
import passedProducts from '@content/passedProducts.ts';
import { clearCart } from '@stores/cartStore';

export function getProductsArray(): Product[] {
  const products = getProducts();
  const productList = Object.values(products);
  // return [...productList, ...productList];
  return productList;
}

export function getProductById(id: string): Product {
  if (!id) {
    throw new Error('Product ID is required');
  }

  const product = getImportedProductById(id);

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

export function getProductByStripePriceId(priceId: string): {
  product: Product;
  size: string;
} | null {
  const products = getProductsArray();
  for (const product of products) {
    if (product.sizes) {
      for (const [size, sizeData] of Object.entries(product.sizes)) {
        if (sizeData.stripeProductId === priceId) {
          return { product, size };
        }
      }
    }
  }
  return null;
}

export function getPassedProducts() {
  return passedProducts;
}

export function getProductOrderCounts(
  priceQuantities: Record<string, number>,
): Record<string, number> {
  const products = getProductsArray();
  const productCounts: Record<string, number> = {};

  for (const product of products) {
    const total = Object.values(product.sizes ?? {}).reduce(
      (sum, size) => sum + (priceQuantities[size.stripeProductId] ?? 0),
      0,
    );
    productCounts[product.id] = total;
  }

  return productCounts;
}

export function getDrops(): string[] {
  const drops = Object.values(getProducts())
    .map((product) => product.drop)
    .filter((drop): drop is string => drop !== undefined);
  return [...new Set(drops)];
}

export function getProductsByDrop(drop: string): Product[] {
  return Object.values(getProducts()).filter(
    (product) => product.drop === drop,
  );
}
