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
      class="hover:bg-primary hover:text-secondary box-border cursor-pointer border-2 px-8 py-3 text-black focus:outline-hidden disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
