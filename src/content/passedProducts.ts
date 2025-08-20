import type { Sex } from '@content/products';

import VersusSocksFemale from '@images/products/1L5A0176.jpg';
import VersusSocksProduct from '@images/products/1L5A0212.jpeg';

type PassedProduct = {
  id: string;
  title: string;
  description?: string;
  imageUrls: string[];
  sex: Sex;
};

const products: PassedProduct[] = [
  {
    id: 'versus-socks-2-unisex',
    title: 'Versus Socks - White',
    imageUrls: [VersusSocksProduct.src, VersusSocksFemale.src],
    sex: 'Unisex',
  },
];

export default products;
