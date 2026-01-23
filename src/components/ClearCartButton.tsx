import { useState } from 'preact/hooks';
import { clearCart } from '@stores/cartStore';
import { showToast } from '@stores/toastStore';

const ClearCartButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared');
  };

  return (
    <button
      class={`cursor-pointer py-2 text-gray-400 underline-offset-4 hover:text-black focus:outline-hidden ${isClicked && 'click-pulse'}`}
      onClick={() => {
        setIsClicked(true);
        handleClearCart();
        setTimeout(() => setIsClicked(false), 300);
      }}
    >
      Clear Cart
    </button>
  );
};

export default ClearCartButton;
