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
      XL: { stripeProductId: 'price_1RsIqlDWqual0M5B3GcNsrLh' },
    },
    title: 'ATTAKK Racing Team RS25 - Invincible Yellow',
    price: 150,
  },
  2: {
    id: '2',
    imageUrls: [Marc.src, BibshortsImage.src],
    sizes: {
      S: { stripeProductId: 'price_1RrbGDDWqual0M5BD22C0u21' },
      M: { stripeProductId: 'price_1RrwvTDWqual0M5Bfym96yl0' },
      L: { stripeProductId: 'price_1RrwvbDWqual0M5BlthgseQT' },
      XL: { stripeProductId: 'price_1RrwvnDWqual0M5BdcoKiAFa' },
    },
    title: 'ATTAKK Bibs 25 – Invincible Yellow',
    price: 105,
  },
  3: {
    id: '3',
    imageUrls: [Sam.src, JerseyImage.src],
    sizes: {
      S: { stripeProductId: 'price_1RrbFqDWqual0M5B2mxtGIM1' },
      M: { stripeProductId: 'price_1RrwqTDWqual0M5BtJRPrXHM' },
      L: { stripeProductId: 'price_1RrwqmDWqual0M5Btp1v7whe' },
      XL: { stripeProductId: 'price_1RrwrGDWqual0M5Bm2rbDUUy' },
    },
    title: 'ATTAKK Jersey 25 – Invincible Yellow',
    price: 75,
  },
};

export default products;
