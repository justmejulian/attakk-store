import { useStore } from '@nanostores/preact';
import { selectedSize } from '@stores/cartStore';
interface Props {
  id: string;
  sizes: string[];
}

export default function SizeButtons({ id, sizes }: Props) {
  const $selectedSize = useStore(selectedSize);
  return (
    <fieldset class="mb-3 flex gap-1">
      <legend class="sr-only">Delivery</legend>

      {sizes.map((size) => {
        const key = `Size-${size}-${id}`;
        return (
          <div class="flex items-center" key={size}>
            <label
              for={key}
              class={`hover:bg-primary hover:text-secondary cursor-pointer border-2 px-4 py-2 ${$selectedSize === size && 'bg-primary text-secondary'}`}
            >
              <p class="text-gray-700">{size}</p>

              <input
                type="radio"
                name="SizeOption"
                value={size}
                id={key}
                class="sr-only"
                checked={$selectedSize === size}
                onChange={() => {
                  selectedSize.set(size);
                }}
              />
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
