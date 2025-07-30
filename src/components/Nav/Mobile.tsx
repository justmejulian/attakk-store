import { useState } from 'preact/hooks';
import type { Link } from './types';

interface Props {
  links: Link[];
}

const Mobile = ({ links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {isMenuOpen && (
        <div
          role="menu"
          class="absolute end-0 top-10 z-auto m-4 w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
        >
          {links.map((link: Link) => (
            <a
              key={link.href}
              href={link.href}
              class="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mobile;
