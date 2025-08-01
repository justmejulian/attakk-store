import { getProductById } from '@content/products';
import {
  addToCart,
  decreaseItemQuantity,
  removeFromCart,
} from '@stores/cartStore';

interface Props {
  id: string;
  quantity: number;
  size: string;
}

function CartItem({ id, quantity, size }: Props) {
  const product = getProductById(id);

  return (
    <li class="flex items-center gap-4">
      <img
        src={product.imageUrls[1]}
        alt=""
        class="size-16 rounded-sm object-cover"
      />

      <div>
        <h3 class="text-secondary text-sm">{product.title}</h3>

        <dl class="mt-0.5 space-y-px text-[10px]">
          <div>
            <dd class="inline">Male</dd>
          </div>

          <div>
            <dt class="inline">Size:</dt>
            <dd class="inline">{size}</dd>
          </div>
        </dl>
      </div>

      <div class="flex flex-1 items-center justify-end gap-2">
        <label for="Line1Qty" class="sr-only">
          Quantity
        </label>

        {quantity > 1 && (
          <button
            type="button"
            class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
            onClick={() => decreaseItemQuantity(product.id, size)}
          >
            -
          </button>
        )}

        <div class="flex h-8 w-12 items-center justify-center rounded-sm border-gray-200 bg-gray-50 p-0 text-xs">
          {quantity}
        </div>

        <button
          type="button"
          class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={() => addToCart(product.id, size)}
        >
          +
        </button>

        <button
          class="hover:text-secondary text-gray-600 transition"
          onClick={() => removeFromCart(product.id, size)}
        >
          <span class="sr-only">Remove item</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default CartItem;
