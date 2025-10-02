// src/lib/stores/traditionStore.ts
import { writable } from 'svelte/store';

// Tradition data structure with scores for each stage
const traditions = {
  buddhism: {
    scores: {
      beige: 2,
      purple: 3,
      red: 3,
      blue: 4,
      orange: 3,
      green: 4,
      yellow: 5,
      turquoise: 5,
      coral: 4,
      ultraviolet: 3
    },
    color: '#FFA500' // Orange color for Buddhism
  },
  christianity: {
    scores: {
      beige: 3,
      purple: 4,
      red: 3,
      blue: 5,
      orange: 3,
      green: 5,
      yellow: 4,
      turquoise: 4,
      coral: 3,
      ultraviolet: 3
    },
    color: '#4169E1' // Royal blue for Christianity
  },
  islam: {
    scores: {
      beige: 3,
      purple: 3,
      red: 3,
      blue: 5,
      orange: 4,
      green: 4,
      yellow: 4,
      turquoise: 5,
      coral: 3,
      ultraviolet: 3
    },
    color: '#006400' // Dark green for Islam
  },
  hinduism: {
    scores: {
      beige: 3,
      purple: 5,
      red: 4,
      blue: 5,
      orange: 4,
      green: 4,
      yellow: 5,
      turquoise: 5,
      coral: 4,
      ultraviolet: 4
    },
    color: '#FF4500' // Orange-red for Hinduism
  },
  daoism: {
    scores: {
      beige: 3,
      purple: 3,
      red: 3,
      blue: 2,
      orange: 3,
      green: 4,
      yellow: 5,
      turquoise: 5,
      coral: 4,
      ultraviolet: 4
    },
    color: '#008080' // Teal for Daoism
  },
  newage: {
    scores: {
      beige: 2,
      purple: 5,
      red: 3,
      blue: 2,
      orange: 2,
      green: 5,
      yellow: 3,
      turquoise: 3,
      coral: 2,
      ultraviolet: 2
    },
    color: '#9932CC' // Purple for New Age
  },
  yoga: {
    scores: {
      beige: 3,
      purple: 4,
      red: 3,
      blue: 4,
      orange: 4,
      green: 4,
      yellow: 5,
      turquoise: 5,
      coral: 4,
      ultraviolet: 3
    },
    color: '#FF1493' // Deep pink for Yoga
  }
};

// Multilingual names for traditions
export const traditionNames = {
  en: {
    buddhism: "Buddhism",
    christianity: "Christianity",
    islam: "Islam & Sufism",
    hinduism: "Hinduism",
    daoism: "Daoism",
    newage: "New Age & Occultism",
    yoga: "Yoga"
  },
  sv: {
    buddhism: "Buddhism",
    christianity: "Kristendom",
    islam: "Islam & Sufism",
    hinduism: "Hinduism",
    daoism: "Daoism",
    newage: "New Age & Ockultism",
    yoga: "Yoga"
  }
};

// Helper functions matching the pattern of assistantStore
export function getTraditionNames(): string[] {
  return Object.keys(traditions);
}

export function getTraditionColor(name: string): string {
  return traditions[name]?.color || '#CCCCCC';
}

export function getTraditionScoresArray(name: string): number[] {
  if (!traditions[name]) return Array(10).fill(0);
  const { scores } = traditions[name];
  return [
    scores.beige, scores.purple, scores.red, scores.blue, scores.orange,
    scores.green, scores.yellow, scores.turquoise, scores.coral, scores.ultraviolet
  ];
}

const traditionStore = writable(traditions);
export default traditionStore;
