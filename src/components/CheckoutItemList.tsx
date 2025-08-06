import { useStore } from '@nanostores/preact';

import { cartItems } from '@stores/cartStore';
import { getProductById } from '@utils/products';

export default function Checkout() {
  const $cartItems = useStore(cartItems);

  // todo: make collapsible on mobile
  return (
    $cartItems && (
      <div class="w-1/2 min-w-sm p-6 md:min-h-full">
        <h2 class="mb-4">Order Summary</h2>
        <ul>
          {Object.values($cartItems).map((item) => (
            <li key={item.id + item.size}>
              <div class="flex w-full items-center py-2">
                <img
                  src={getProductById(item.id).imageUrls[1]}
                  alt={getProductById(item.id).title}
                  class="mr-6 inline-block h-8 w-8"
                />
                <div class="flex flex-col">
                  <h4>{getProductById(item.id).title}</h4>
                  <span class="text-sm text-gray-500">
                    Size:
                    {item.size}
                  </span>
                  <span class="text-sm text-gray-500">
                    Quantity:
                    {item.quantity}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
