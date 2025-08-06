interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  disabledTooltipText?: string;
}

import { useState } from 'preact/hooks';

function Button({ title, onClick, disabled, disabledTooltipText }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      disabled={disabled}
      title={disabled ? disabledTooltipText : ''}
      class={`hover:text-tertiary hover:decoration-primary cursor-pointer py-2 text-black underline-offset-4 hover:underline focus:outline-hidden disabled:text-gray-500 disabled:hover:decoration-white ${isClicked && 'click-pulse'}`}
      onClick={() => {
        setIsClicked(true);
        onClick();
        setTimeout(() => setIsClicked(false), 300);
      }}
    >
      {title}
    </button>
  );
}

export default Button;
