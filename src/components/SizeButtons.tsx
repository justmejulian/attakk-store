import { useStore } from '@nanostores/preact';
import { selectedSize } from '@stores/cartStore';

interface Props {
  sizes: string[];
}

export default function SizeButtons({ sizes }: Props) {
  const $selectedSize = useStore(selectedSize);
  return (
    <fieldset class="mb-3 flex gap-1">
      <legend class="sr-only">Delivery</legend>

      {sizes.map((size) => (
        <div class="flex items-center" key={size}>
          <label
            for={`Size${size}`}
            class={`cursor-pointer border-2 px-4 py-2 ${$selectedSize === size && 'bg-primary text-secondary'}`}
          >
            <p class="text-gray-700">{size}</p>

            <input
              type="radio"
              name="SizeOption"
              value={size}
              id={`Size${size}`}
              class="sr-only"
              checked={$selectedSize === size}
              onChange={() => selectedSize.set(size)}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
