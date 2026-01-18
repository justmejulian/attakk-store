import fs from 'fs';
import { execSync } from 'child_process';

import { getProducts, getPrices } from '@utils/stripe';

import type { Product } from '@stripe/stripe-js';

type SizeProduct = {
  stripeProductId: string;
};

export type Sex = 'Male' | 'Female' | 'Unisex';

function mapSexToPrices(prices) {
  return prices.reduce((acc: Record<string, Product[]>, price) => {
    if (!price.metadata) {
      console.warn('Price metadata is missing:', price);
      return acc;
    }
    const sex = price.metadata.Sex || 'Unisex';
    if (acc[sex]) {
      acc[sex].push(price);
    } else {
      acc[sex] = [price];
    }
    return acc;
  }, {});
}

async function createProductObject(
  product: Product,
  sex,
  prices,
): Promise<Product> {
  const drop = product.metadata?.drop;

  return {
    id: `${product.id}-${sex.toLowerCase()}`,
    title: product.name,
    description: product.description,
    imageUrls: product.images,
    price: prices[0].unit_amount, // in CHF
    sex: sex,
    drop: drop,
    sizes: prices.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: Record<string, SizeProduct>, price: any) => {
        const size = price.nickname || 'One Size';
        acc[size] = {
          stripeProductId: price.id,
        };
        return acc;
      },
      {},
    ),
  };
}

async function createProductObjects() {
  const products = await getProducts();
  const acc: Record<string, any> = {};

  for (const product of products) {
    const allPrices = await getPrices(product.id);
    const sexPrices = mapSexToPrices(allPrices);

    const sexPricesObjects = await Promise.all(
      Object.keys(sexPrices).map(async (sex) => {
        return await createProductObject(product, sex, sexPrices[sex]);
      }),
    );

    for (const p of sexPricesObjects) {
      const id = p.id;
      acc[id] = p;
    }
  }

  return acc;
}

async function writeProductsToFile(
  filePath: string,
  products: Record<string, any>,
) {
  const importDate = new Date().toISOString();
  const fileContent = `
// This file is auto-generated. Do not edit manually.
// Generated on: ${importDate}
import type { Product } from '@content/products';
export const importedProducts: Record<string, Product> = ${JSON.stringify(products, null, 2)};\n
`;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  fs.writeFileSync('src/content/importedProducts.ts', fileContent, 'utf8');

  // Format the file with Prettier
  console.log('Formatting importedProducts.ts with Prettier...');
  execSync('npx prettier --write src/content/importedProducts.ts', {
    stdio: 'inherit',
  });
}

async function main() {
  console.log('Starting product creation process...');
  const products = await createProductObjects();
  console.log(`Created ${products.length} products successfully.`);
  console.log('Writing products to importedProducts.ts...');

  const filePath = 'src/content/importedProducts.ts';
  await writeProductsToFile(filePath, products);
  console.log(`Products written to ${filePath}`);
}
main().catch((error) => {
  console.error('Error running the product creation script:', error);
});
