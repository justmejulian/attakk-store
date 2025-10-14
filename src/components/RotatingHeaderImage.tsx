import { useEffect, useState } from 'preact/hooks';
import Image1 from '@images/header/IMG_2215.png';
import Image2 from '@images/header/IMG_2216.jpg';
import Image3 from '@images/header/IMG_2217.png';
import Image4 from '@images/header/IMG_2205.jpg';
import Image5 from '@images/header/IMG_2219.jpg';
import Image6 from '@images/header/PHOTO-2025-07-30-11-51-04.jpg';

// todo can this be loaded dynamically? astro collection?
const headerImages = [Image1, Image2, Image3, Image4, Image5, Image6];

export default function RotatingHeaderImage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {headerImages.map((img, index) => (
        <img
          key={img.src}
          src={img.src}
          alt="Header"
          className={`absolute top-0 h-full w-full object-cover object-right transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-40' : 'opacity-0'
          }`}
        />
      ))}
    </>
  );
}
