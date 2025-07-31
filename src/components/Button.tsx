interface Props {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: Props) {
  return (
    <button
      class="hover:bg-primary border-tertiary text-tertiary hover:text-secondary cursor-pointer border-2 px-8 py-3 focus:ring-3 focus:outline-hidden"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
