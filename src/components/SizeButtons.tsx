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
            <label for={key} class="px-2">
              <p
                class={`hover:text-tertiary hover:decoration-primary cursor-pointer underline-offset-4 hover:underline ${
                  $selectedSize === size &&
                  'decoration-primary text-tertiary underline'
                }`}
              >
                {size}
              </p>

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
