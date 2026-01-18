import { getProductByStripePriceId } from '@utils/products';

export type LineItem = {
  price_id: string;
  quantity: number;
};

type CheckoutItemListProps = {
  lineItems?: LineItem[];
};

export default function CheckoutItemList({ lineItems }: CheckoutItemListProps) {
  if (!lineItems || lineItems.length === 0) {
    return null;
  }

  const items = lineItems
    .map((lineItem) => {
      const result = getProductByStripePriceId(lineItem.price_id);
      if (!result) {
        console.error(`Product not found for price ID: ${lineItem.price_id}`);
        return null;
      }
      return {
        id: result.product.id,
        size: result.size,
        quantity: lineItem.quantity,
        product: result.product,
      };
    })
    .filter((item) => item !== null);

  // todo: make collapsible on mobile
  return (
    <div class="w-1/2 min-w-sm p-6 md:min-h-full">
      <h2 class="mb-4">Order Summary</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id + item.size}>
            <div class="flex w-full items-center py-2">
              <img
                src={item.product.imageUrls[0]}
                alt={item.product.title}
                class="mr-6 inline-block h-8 w-8 object-contain"
              />
              <div class="flex flex-col">
                <h4>{item.product.title}</h4>
                <span class="text-sm text-gray-500">{item.product.sex}</span>
                <span class="text-sm text-gray-500">Size: {item.size}</span>
                <span class="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
