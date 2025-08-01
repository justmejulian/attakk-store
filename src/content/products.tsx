// Todo: better naming for the images

import RaceSuitImage from '@images/racesuit.jpg';
import BibshortsImage from '@images/bibshorts.jpg';
import JerseyImage from '@images/jersey.jpg';

import Marc from '@images/PHOTO-2025-07-30-12-57-35.jpg';
import Sam from '@images/PHOTO-2025-07-30-11-51-06.jpg';
import Ramon from '@images/PHOTO-2025-07-30-11-51-05.jpg';

export type Product = {
  id: string;
  imageUrls: [string, string];
  title: string;
  price: number;
};

const products: Product[] = [
  {
    id: '1',
    imageUrls: [Ramon.src, RaceSuitImage.src],
    title: 'Race Suit',
    price: 40,
  },
  {
    id: '2',
    imageUrls: [Marc.src, BibshortsImage.src],
    title: 'Bib Shorts',
    price: 30,
  },
  {
    id: '3',
    imageUrls: [Sam.src, JerseyImage.src],
    title: 'Jersey',
    price: 25,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product {
  if (!id) {
    throw new Error('Product ID is required');
  }
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  return product;
}
