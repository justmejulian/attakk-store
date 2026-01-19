import { importedProducts } from './importedProducts';

export type StripProduct = {
  stripeProductId: string;
};

export type Product = {
  id: string;
  imageUrls: string[];
  videoUrl?: string;
  sex: Sex;
  sizes?: Record<string, StripProduct>;
  description?: string;
  title: string;
  price: number;
  drop?: string;
  fitUrl?: string;
};

export function getImportedProductById(id: string): Product {
  const product = importedProducts[id];
  if (!product) {
    throw new Error(`Product with id ${id} not found in imported products`);
  }
  return product;
}

export function getProducts() {
  return importedProducts;
}
