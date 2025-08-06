interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  disabledTooltipText?: string;
}

function Button({ title, onClick, disabled, disabledTooltipText }: Props) {
  return (
    <button
      disabled={disabled}
      title={disabled ? disabledTooltipText : ''}
      class="hover:text-tertiary hover:decoration-primary cursor-pointer px-8 py-3 text-black underline-offset-4 hover:underline focus:outline-hidden disabled:text-gray-500 disabled:hover:bg-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
