interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return (
    <button
      className="inline-block rounded-sm border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
      onClick={() => console.log('Button clicked')}
    >
      {title}
    </button>
  );
}

export default Button;
