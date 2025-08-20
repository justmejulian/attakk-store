// Todo: better naming for the images

import RaceSuitMale from '@images/products/PHOTO-2025-07-30-11-51-06.jpg';
import RaceSuitFemale from '@images/products/1L5A0132.jpg';

import JerseyFemale from '@images/products/1L5A0127.jpg';
import JerseyMale from '@images/products/PHOTO-2025-07-30-11-46-30.jpg';

import BibshortsFemale from '@images/products/1L5A0205.jpg';
import BibshortsMale from '@images/products/PHOTO-2025-07-30-12-57-35.jpg';

import { importedProducts } from './importedProducts';

export type StripProduct = {
  stripeProductId: string;
};

export type Sex = 'Male' | 'Female' | 'Unisex';

export type Product = {
  id: string;
  imageUrls: string[];
  sex: Sex;
  sizes?: Record<string, StripProduct>;
  description?: string;
  title: string;
  price: number;
};

function getImportedProductById(id: string): Product {
  const product = importedProducts[id];
  if (!product) {
    throw new Error(`Product with id ${id} not found in imported products`);
  }
  return product;
}

const currentCollection: Product[] = [
  getImportedProductById('prod_SmUaTbKJd3uWBR-male'),
  getImportedProductById('prod_SnBdFNjPSXbZJk-female'),
  getImportedProductById('prod_SmUaTbKJd3uWBR-female'),
  getImportedProductById('prod_SnBd0mH8WE0TAN-female'),
  getImportedProductById('prod_SnYEYLnprmArZ1-unisex'),
  getImportedProductById('prod_SnBd0mH8WE0TAN-male'),
  getImportedProductById('prod_SnYOKBMkXTLTFV-unisex'),
  getImportedProductById('prod_SnBdFNjPSXbZJk-male'),
  getImportedProductById('prod_SnYHhrveP2IQoA-unisex'),
];

// Current collection with title Images
// order will be the order used
const products: Product[] = [
  {
    ...currentCollection[0],
    imageUrls: [currentCollection[0]?.imageUrls[0], RaceSuitMale.src],
  },
  {
    ...currentCollection[1],
    imageUrls: [currentCollection[1]?.imageUrls[0], JerseyFemale.src],
  },
  {
    ...currentCollection[2],
    imageUrls: [currentCollection[2]?.imageUrls[0], RaceSuitFemale.src],
  },
  {
    ...currentCollection[3],
    imageUrls: [currentCollection[3]?.imageUrls[0], BibshortsFemale.src],
  },
  {
    ...currentCollection[4],
  },
  {
    ...currentCollection[5],
    imageUrls: [currentCollection[5]?.imageUrls[0], BibshortsMale.src],
  },
  {
    ...currentCollection[6],
  },
  {
    ...currentCollection[7],
    imageUrls: [currentCollection[7]?.imageUrls[0], JerseyMale.src],
  },
  {
    ...currentCollection[8],
  },
];

export default products;
