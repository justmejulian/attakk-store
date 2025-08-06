import Button from '@components/Button';
import { useStore } from '@nanostores/preact';

import { addToCart, selectedSize } from '@stores/cartStore';

interface Props {
  productId: string;
}

function AddProductButton({ productId }: Props) {
  const $selectedSize = useStore(selectedSize);
  return (
    <Button
      title="Add to Cart"
      disabled={!$selectedSize}
      disabledTooltipText="Please select a size"
      onClick={() => {
        addToCart(productId, $selectedSize);
      }}
    />
  );
}

export default AddProductButton;
