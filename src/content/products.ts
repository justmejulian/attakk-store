// Todo: better naming for the images

import RaceSuitImage from '@images/racesuit.jpg';
import BibshortsImage from '@images/bibshorts.jpg';
import JerseyImage from '@images/jersey.jpg';

import Marc from '@images/PHOTO-2025-07-30-12-57-35.jpg';
import Sam from '@images/PHOTO-2025-07-30-11-51-06.jpg';
import Ramon from '@images/PHOTO-2025-07-30-11-51-05.jpg';

export type StripProduct = {
  stripeProductId: string;
};

export type Product = {
  id: string;
  imageUrls: [string, string];
  sizes?: Record<string, StripProduct>;
  title: string;
  price: number;
};

const products: Record<string, Product> = {
  1: {
    id: '1',
    imageUrls: [Ramon.src, RaceSuitImage.src],
    sizes: {
      S: { stripeProductId: 'price_1RrbaFDWqual0M5BJGdzHsoJ' },
      M: { stripeProductId: 'price_1Rqvb0DWqual0M5BXfbHQqgE' },
      L: { stripeProductId: 'price_1RrbasDWqual0M5Be5XOzd3f' },
      XL: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
    },
    title: 'ATK Einteiler',
    price: 150,
  },
  2: {
    id: '2',
    imageUrls: [Marc.src, BibshortsImage.src],
    sizes: {
      S: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      M: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      L: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      XL: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
    },
    title: 'ATK Bikeshorts',
    price: 150,
  },
  3: {
    id: '3',
    imageUrls: [Sam.src, JerseyImage.src],
    sizes: {
      S: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      M: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      L: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
      XL: { stripeProductId: 'price_1Rrbb8DWqual0M5BnLfkyAAr' },
    },
    title: 'ATK Jersey',
    price: 150,
  },
};

export default products;
