interface Props {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: Props) {
  return (
    <button
      class="hover:bg-primary hover:text-secondary box-border cursor-pointer border-2 px-8 py-3 text-black"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
