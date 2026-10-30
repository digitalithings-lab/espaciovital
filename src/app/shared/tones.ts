import { Tone } from '../core/models';

// Clases de color por tono, para que cada tarjeta use la paleta de la marca de forma consistente.
export const TONE: Record<Tone, { soft: string; text: string; solid: string; border: string }> = {
  leaf: { soft: 'bg-leaf-100', text: 'text-leaf-700', solid: 'bg-leaf-700 text-white', border: 'border-leaf-500' },
  clay: { soft: 'bg-clay-100', text: 'text-clay-600', solid: 'bg-clay-500 text-white', border: 'border-clay-500' },
  lilac: { soft: 'bg-lilac-100', text: 'text-lilac-600', solid: 'bg-lilac-600 text-white dark:text-ink', border: 'border-lilac-600' },
  honey: { soft: 'bg-honey-100', text: 'text-honey-600', solid: 'bg-honey-600 text-white dark:text-ink', border: 'border-honey-600' },
};
