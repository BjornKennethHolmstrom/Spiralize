import { writable } from 'svelte/store';
import { locale } from 'svelte-i18n';

// Define the type for the language
export type Language = 'en' | 'sv';

// Initialize language store with default value
const language = writable<Language>('en');

// Subscribe to changes and update i18n locale
language.subscribe((value) => {
  locale.set(value);
});

// Helper function to toggle language
function toggleLanguage(): void {
  language.update(current => (current === 'en' ? 'sv' : 'en'));
}

// Export default store and function
export default { language, toggleLanguage };
