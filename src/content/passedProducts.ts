import type { Sex } from '@content/products';

import VersusSocksFemale from '@images/products/1L5A0176.jpg';
import VersusSocksProduct from '@images/products/1L5A0212.jpeg';
import TshirtBlack2023Image1 from '@images/products/IMG_2214.jpg';
import TshirtBlack2023Image2 from '@images/products/IMG_2212.jpg';
import TshirtWhite2025Image1 from '@images/products/IMG_2202.png';
import TshirtWhite2025Image2 from '@images/products/IMG_2203.png';
import TankBlack2025Image1 from '@images/products/IMG_2200.png';
import TankBlack2025Image2 from '@images/products/PHOTO-2026-01-12-14-05-17.jpg';
import VersusSocksBlackImage1 from '@images/products/Attakk_Studios.jpg';
import VersusSocksBlackImage2 from '@images/products/IMG_3568.png';
import BibsYellowFemale from '@images/products/1L5A0132.jpg';
import BibsYellowMale from '@images/products/PHOTO-2025-07-30-12-57-35.jpg';

type PassedProduct = {
  id: string;
  title: string;
  description?: string;
  imageUrls: string[];
  sex: Sex;
};

const products: PassedProduct[] = [
  {
    id: 'bibs-invincible-yellow-female',
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    description:
      "Quiet. Precise. Committed. The Invincible Bibs are built for focus - from zone 4 intervals to Sunday base rides. Supportive, sharp and stripped of distraction, they're made to match your mindset: ride hard, ride long, ride clean.",
    imageUrls: [
      'https://files.stripe.com/links/MDB8YWNjdF8xUnF2VjZEV3F1YWwwTTVCfGZsX3Rlc3RfU0lOUVhnazFmSFVZVzhrQU9VdjRaWXBp00qPDXgrEP',
      BibsYellowFemale.src,
    ],
    sex: 'Female',
  },
  {
    id: 'bibs-invincible-yellow-male',
    title: 'ATTAKK Race Suit 25 - Invincible Yellow',
    description:
      "Quiet. Precise. Committed. The Invincible Bibs are built for focus - from zone 4 intervals to Sunday base rides. Supportive, sharp and stripped of distraction, they're made to match your mindset: ride hard, ride long, ride clean.",
    imageUrls: [
      'https://files.stripe.com/links/MDB8YWNjdF8xUnF2VjZEV3F1YWwwTTVCfGZsX3Rlc3RfU0lOUVhnazFmSFVZVzhrQU9VdjRaWXBp00qPDXgrEP',
      BibsYellowMale.src,
    ],
    sex: 'Male',
  },
  {
    id: 'versus-socks-2-unisex',
    title: 'Versus Socks - White',
    imageUrls: [VersusSocksProduct.src, VersusSocksFemale.src],
    sex: 'Unisex',
  },
  {
    id: 'tshirt-black-2023',
    title: 'T-Shirt 2023 - Black',
    imageUrls: [TshirtBlack2023Image1.src, TshirtBlack2023Image2.src],
    sex: 'Unisex',
  },
  {
    id: 'tshirt-white-2025',
    title: 'T-Shirt 2025 - White',
    imageUrls: [TshirtWhite2025Image1.src, TshirtWhite2025Image2.src],
    sex: 'Unisex',
  },
  {
    id: 'tank-black-2025',
    title: 'Tank 2025 - Black',
    imageUrls: [TankBlack2025Image1.src, TankBlack2025Image2.src],
    sex: 'Unisex',
  },
  {
    id: 'versus-socks-black',
    title: 'Versus Socks - Black',
    imageUrls: [VersusSocksBlackImage1.src, VersusSocksBlackImage2.src],
    sex: 'Unisex',
  },
];

export default products;
