import Button from '@preact/Button';

import { addToCart } from '@stores/cartStore';

interface AddProductButton {
  productId: string;
}

function AddProductButton({ productId }: AddProductButton) {
  return <Button title="Add to Cart" onClick={() => addToCart(productId)} />;
}

export default AddProductButton;
