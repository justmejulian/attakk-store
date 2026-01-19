import { useStore } from '@nanostores/preact';
import { selectedSize } from '@stores/cartStore';
interface Props {
  id: string;
  sizes: string[];
}

const SIZE_ORDER = ['2xs', 'xs-s', 'xs', 's', 'm', 'l', 'l-xl', 'xl', '2xl'];

export default function SizeButtons({ id, sizes }: Props) {
  const $selectedSize = useStore(selectedSize);
  const sortedSizes = [...sizes].sort((a, b) => {
    const aIndex = SIZE_ORDER.indexOf(a.toLowerCase());
    const bIndex = SIZE_ORDER.indexOf(b.toLowerCase());
    return aIndex - bIndex;
  });

  return (
    <fieldset class="mb-3 flex gap-1">
      <legend class="sr-only">Delivery</legend>

      {sortedSizes.map((size) => {
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
