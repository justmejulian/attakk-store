// Todo: better naming for the images

import RaceSuitImage from '@images/racesuit.jpg';
import BibshortsImage from '@images/bibshorts.jpg';
import JerseyImage from '@images/jersey.jpg';

import Marc from '@images/PHOTO-2025-07-30-12-57-35.jpg';
import Sam from '@images/PHOTO-2025-07-30-11-51-06.jpg';
import Ramon from '@images/PHOTO-2025-07-30-11-51-05.jpg';

import AIFemale1 from '@images/ai-female-1.png';
import AIFemale2 from '@images/ai-female-2.png';
import AIFemale3 from '@images/ai-female-3.png';

export type StripProduct = {
  stripeProductId: string;
};

export type Sex = 'Male' | 'Female' | 'Unisex';

export type Product = {
  id: string;
  imageUrls: [string, string];
  sex: Sex;
  sizes?: Record<string, StripProduct>;
  title: string;
  price: number;
};

const products: Product[] = [
  {
    id: 'prod_SmUaTbKJd3uWBR-male',
    imageUrls: [Ramon.src, RaceSuitImage.src],
    sex: 'Male',
    sizes: {
      S: { stripeProductId: 'price_1RrbaFDWqual0M5BJGdzHsoJ' },
      M: { stripeProductId: 'price_1Rqvb0DWqual0M5BXfbHQqgE' },
      L: { stripeProductId: 'price_1RrbasDWqual0M5Be5XOzd3f' },
      XL: { stripeProductId: 'price_1RsIqlDWqual0M5B3GcNsrLh' },
    },
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    price: 150,
  },
  {
    id: 'prod_SmUaTbKJd3uWBR-female',
    imageUrls: [AIFemale2.src, RaceSuitImage.src],
    sex: 'Female',
    sizes: {
      XS: { stripeProductId: 'price_1RsIteDWqual0M5BSN2d6a4K' },
      S: { stripeProductId: 'price_1RsItTDWqual0M5BEfTwSe29' },
      M: { stripeProductId: 'price_1RsItnDWqual0M5BlNyhJklP' },
      L: { stripeProductId: 'price_1RsItzDWqual0M5ByD1gvPv1' },
    },
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    price: 150,
  },
  {
    id: '3',
    imageUrls: [Marc.src, BibshortsImage.src],
    sex: 'Male',
    sizes: {
      S: { stripeProductId: 'price_1RrbGDDWqual0M5BD22C0u21' },
      M: { stripeProductId: 'price_1RrwvTDWqual0M5Bfym96yl0' },
      L: { stripeProductId: 'price_1RrwvbDWqual0M5BlthgseQT' },
      XL: { stripeProductId: 'price_1RrwvnDWqual0M5BdcoKiAFa' },
    },
    title: 'ATTAKK Bibs 25 - Invincible Yellow',
    price: 105,
  },
  {
    id: 'prod_SmUaTbKJd3uWBR-female',
    imageUrls: [AIFemale3.src, RaceSuitImage.src],
    sex: 'Female',
    sizes: {
      XS: { stripeProductId: 'price_1RsIteDWqual0M5BSN2d6a4K' },
      S: { stripeProductId: 'price_1RsItTDWqual0M5BEfTwSe29' },
      M: { stripeProductId: 'price_1RsItnDWqual0M5BlNyhJklP' },
      L: { stripeProductId: 'price_1RsItzDWqual0M5ByD1gvPv1' },
    },
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    price: 150,
  },
  {
    id: '4',
    imageUrls: [Sam.src, JerseyImage.src],
    sex: 'Male',
    sizes: {
      S: { stripeProductId: 'price_1RrbFqDWqual0M5B2mxtGIM1' },
      M: { stripeProductId: 'price_1RrwqTDWqual0M5BtJRPrXHM' },
      L: { stripeProductId: 'price_1RrwqmDWqual0M5Btp1v7whe' },
      XL: { stripeProductId: 'price_1RrwrGDWqual0M5Bm2rbDUUy' },
    },
    title: 'ATTAKK Jersey 25 - Invincible Yellow',
    price: 75,
  },
  {
    id: 'prod_SmUaTbKJd3uWBR-female',
    imageUrls: [AIFemale1.src, RaceSuitImage.src],
    sex: 'Female',
    sizes: {
      XS: { stripeProductId: 'price_1RsIteDWqual0M5BSN2d6a4K' },
      S: { stripeProductId: 'price_1RsItTDWqual0M5BEfTwSe29' },
      M: { stripeProductId: 'price_1RsItnDWqual0M5BlNyhJklP' },
      L: { stripeProductId: 'price_1RsItzDWqual0M5ByD1gvPv1' },
    },
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    price: 150,
  },
];

export default products;
