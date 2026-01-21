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
  colors: DropColors;
  bannerTextColor: string;
  backgroundImage?: ImageMetadata;
  descriptions: string[];
  isLimited: boolean;
};

const drops: Record<string, Drop> = {
  'redline-2026': {
    id: 'redline-2026',
    title: 'REDL/NE 2026',
    colors: { primary: '#8AD4E8', secondary: '#C8382A', tertiary: '#d5202e' },
    bannerTextColor: '#C8382A',
    backgroundImage: redlineImg,
    isLimited: true,
    descriptions: [
      'THIS IS WHERE THE SYSTEM BLURS.',
      'REDL/NE IS FULL-SPEED COMPOSURE. BUILT FOR MOMENTS WHEN LEGS FAIL BUT FOCUS STAYS SHARP. CLEAN FADE, BRUTALIST DETAIL, AND RACE-DAY CLARITY — NO BACKUP PLAN, NO DIAL-DOWN.',
      'SUIT UP. GO ALL IN.',
    ],
  },
  'viper-2026': {
    id: 'viper-2026',
    title: 'V/PER 2026',
    colors: { primary: '#8B6B8B', secondary: '#9AFF4A', tertiary: '#9AFF4A' },
    bannerTextColor: '#9AFF4A',
    backgroundImage: viperImg,
    isLimited: true,
    descriptions: [
      'PATIENCE BREEDS PRECISION.',
      'FORGED IN THE SHADOWS, V/PER IS THE RESULT OF LONG WORK AND PERFECT TIMING. A SINGLE STRIKE JERSEY BUILT FOR ATHLETES WHO WORK IN THE DARK, SHARPEN THEIR TEETH PATIENTLY AND THEN ATTAKK WITHOUT WARNING.',
      'THIS IS ONE IS LOUD BUT EVEN MORE LETHAL.',
    ],
  },
  'invincible-2025': {
    id: 'invincible-2025',
    title: 'Invincible Yellow 2025',
    colors: { primary: '#f5d365', secondary: '#d5202e', tertiary: '#124483' },
    bannerTextColor: '#d5202e',
    isLimited: false,
    descriptions: [
      'The return of a classic — with new intent.',
      'Back by demand, the Invincible Yellow brings race-day energy to the everyday ride. No suit. No ceremony. Just the same sharp attitude in a more versatile cut.',
      'Limited reissue.',
    ],
  },
  'core-2026': {
    id: 'core-2026',
    title: 'ATTAKK CORE 2026',
    colors: { primary: '#3D3D3D' },
    bannerTextColor: '#FFFFFF',
    isLimited: true,
    descriptions: [
      'THIS IS WHERE PRESSURE STARTS.',
      'FROM HEAVY SETS TO HIGH MILEAGE, THE ATTAKK CORE LINE IS BUILT FOR TRAINING THAT LEAVES NO SPACE FOR EGO - ONLY OUTPUT. FUNCTIONAL GEAR FOR FUNCTIONAL MINDS.',
      'MADETO MOVE. MADETO HOLD. MADE FOR EVERY REP BEFORE RACE DAY.',
    ],
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
