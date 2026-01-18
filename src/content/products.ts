import { importedProducts } from './importedProducts';

export type StripProduct = {
  stripeProductId: string;
};

export type Sex = 'Male' | 'Female' | 'Unisex';

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
};

function getImportedProductById(id: string): Product {
  const product = importedProducts[id];
  if (!product) {
    throw new Error(`Product with id ${id} not found in imported products`);
  }
  return product;
}

export function getDrops(): string[] {
  const drops = Object.values(importedProducts)
    .map((product) => product.drop)
    .filter((drop): drop is string => drop !== undefined);
  return [...new Set(drops)];
}

export function getProductsByDrop(drop: string): Product[] {
  return Object.values(importedProducts).filter(
    (product) => product.drop === drop,
  );
}
