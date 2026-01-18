import type { ImageMetadata } from 'astro';
import redlineImg from '@images/drops/redline.jpg';
import viperImg from '@images/drops/viper.jpg';

export type DropColors = {
  primary: string;
  secondary?: string;
  tertiary?: string;
};

export type Drop = {
  id: string;
  title: string;
  titleDisplay: string;
  titleSuffix?: string;
  colors: DropColors;
  backgroundImage?: ImageMetadata;
  badge: string;
  description: string;
  longDescription?: string;
};

const drops: Record<string, Drop> = {
  'viper-2026': {
    id: 'viper-2026',
    title: 'V/PER 2026',
    titleDisplay: 'V/PER',
    titleSuffix: '2026',
    colors: { primary: '#8B6B8B', secondary: '#9AFF4A', tertiary: '#9AFF4A' },
    backgroundImage: viperImg,
    badge: 'New Drop',
    description:
      'Forged in the shadows, V//PER is the result of long work and perfect timing. A single-strike jersey built for athletes who work in the dark, sharpen their teeth patiently and then ATTAKK without warning. This is one is loud but even more lethal.',
    longDescription: 'Limited drop only.',
  },
  'redline-2026': {
    id: 'redline-2026',
    title: 'REDL/NE 2026',
    titleDisplay: 'REDL/NE',
    titleSuffix: '2026',
    colors: { primary: '#8AD4E8', secondary: '#C8382A', tertiary: '#d5202e' },
    backgroundImage: redlineImg,
    badge: 'Core Collection',
    description:
      'Where pressure sits. And stays. The REDL//NE collection is made for sustained intensity. No fuss, no shift — just grip, hold and hammer. Black base, white ATK. Confidence from the saddle up.',
  },
  'invincible-2025': {
    id: 'invincible-2025',
    title: 'Invincible Yellow 2025',
    titleDisplay: 'Invincible',
    titleSuffix: 'Yellow',
    colors: { primary: '#f5d365', secondary: '#d5202e', tertiary: '#124483' },
    badge: 'Classic Reissue',
    description:
      'The return of a classic — with new intent. Back by demand, the Invincible Yellow brings race-day energy to the everyday ride. No suit. No ceremony. Just the same sharp attitude in a more versatile cut. Limited reissue.',
  },
  'core-2026': {
    id: 'core-2026',
    title: 'ATTAKK CORE 2026',
    titleDisplay: 'ATTAKK',
    titleSuffix: 'CORE',
    colors: { primary: '#3D3D3D' },
    badge: 'Essential Collection',
    description:
      "This is ATTAKK CORE. Not only a logo – a mindset. Built for the ones who show up when it's heavy, hot and hard. From the PVL grind to 30k trail runs and Hyrox chaos — it moves like you do.",
  },
};

export const getDropById = (id: string): Drop => {
  const drop = drops[id];
  if (!drop) {
    throw new Error(`Drop with id ${id} not found`);
  }
  return drop;
};

export const getAllDrops = (): Drop[] => {
  return Object.values(drops);
};

export const getDropsByIds = (ids: string[]): Drop[] => {
  return ids.map((id) => getDropById(id));
};
