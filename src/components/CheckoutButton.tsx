import { clearCart } from '@stores/cartStore';

import Button from '@components/Button';

function CheckoutButton() {
  return (
    <Button
      title="Checkout"
      onClick={() => {
        // Handle checkout logic here
        console.log('Proceeding to checkout...');
        clearCart();
      }}
    />
  );
}

export default CheckoutButton;
