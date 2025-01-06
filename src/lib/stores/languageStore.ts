import { writable } from 'svelte/store';

// Define the type for the language
export type Language = 'en' | 'sv';

// Initialize language store with default value
const language = writable<Language>('en');

// Helper function to toggle language
function toggleLanguage(): void {
  language.update(current => (current === 'en' ? 'sv' : 'en'));
}

// Export default store and function
export default { language, toggleLanguage };

