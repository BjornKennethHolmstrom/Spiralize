// src/lib/types/gallery.ts

/**
 * Represents a stage expression in a character
 */
export interface StageExpression {
  stage: string;      // Stage ID (beige, purple, red, etc.)
  level?: 'primary' | 'secondary' | 'tertiary' | string; // Optional level of expression
  description: string; // How the character expresses this stage
  traits?: string[];   // Character traits associated with this stage
}

/**
 * Represents a character in the gallery
 */
export interface Character {
  name: string;                   // Character name
  source: string;                 // Source material (book title, movie name, etc.)
  categories: string | string[];  // Category ID(s) (books, movies, anime, etc.)
  stages: StageExpression | StageExpression[]; // Single stage or multiple stage expressions
  description: string;            // Brief general description of the character
  quote?: string;                 // Optional memorable quote from the character
  fileName: string;               // Original filename for potential detailed view
}

/**
 * Category information with name and icon
 */
export interface CategoryInfo {
  name: string;
  icon: string;
}

/**
 * Stage information with color and name
 */
export interface StageInfo {
  color: string;
  name: string;
}

/**
 * Gallery intro text structure with translations
 */
export interface GalleryIntroText {
  title: string;
  poem: string;
  reflectionTitle: string;
  reflection: string;
  whisper: string;
}
