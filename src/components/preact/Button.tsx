interface ButtonProps {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      className="inline-block cursor-pointer rounded-sm border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
