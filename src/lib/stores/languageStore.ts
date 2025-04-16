import { writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import { browser } from '$app/environment';

// Define the type for the language
export type Language = 'en' | 'sv';

// Initialize language store with stored value or default
const storedLanguage = browser && localStorage.getItem('preferred-language');
const initialLanguage: Language = (
  storedLanguage === 'en' || storedLanguage === 'sv' 
    ? storedLanguage 
    : 'en'
) as Language;

// Create the store with initial value
const language = writable<Language>(initialLanguage);

// Subscribe to changes and update i18n locale and localStorage
language.subscribe((value) => {
  // Update the i18n locale
  locale.set(value);
  
  // Store the language preference in localStorage if in the browser
  if (browser) {
    localStorage.setItem('preferred-language', value);
  }
});

// Helper function to toggle language
function toggleLanguage(): void {
  language.update(current => (current === 'en' ? 'sv' : 'en'));
}

// Export default store and function
export default { language, toggleLanguage };
