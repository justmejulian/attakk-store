import Button from '@components/Button';
import { useStore } from '@nanostores/preact';

import { addToCart, selectedSize } from '@stores/cartStore';

interface Props {
  productId: string;
  availableSizes: string[];
}

function AddProductButton({ productId, availableSizes }: Props) {
  const $selectedSize = useStore(selectedSize);
  const isValidSize = $selectedSize && availableSizes.includes($selectedSize);
  return (
    <Button
      title="Add to Cart"
      disabled={!isValidSize}
      disabledTooltipText="Please select a size"
      onClick={() => {
        addToCart(productId, $selectedSize);
      }}
    />
  );
}

export default AddProductButton;
