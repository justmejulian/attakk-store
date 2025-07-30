import Button from '@components/Button';

import { addToCart } from '@stores/cartStore';

interface Props {
  productId: string;
}

function AddProductButton({ productId }: Props) {
  return <Button title="Add to Cart" onClick={() => addToCart(productId)} />;
}

export default AddProductButton;
